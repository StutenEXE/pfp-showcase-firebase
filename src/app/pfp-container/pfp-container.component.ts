import { Component, OnInit } from '@angular/core';
import { faSort, faSortDown, faSortUp, faUpload } from '@fortawesome/free-solid-svg-icons';

import { firebaseConfig } from '../../env/firebase.config';
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getMetadata, getDownloadURL, uploadBytes } from "firebase/storage";
import { Pfp, pfpConverter } from '../shared/models/pfp.model';
import { Size } from '../shared/models/size.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IdentityDialogComponent } from '../shared/component/identity-dialog/identity-dialog.component';
import { doc, getFirestore, getDoc, arrayUnion, setDoc, addDoc, updateDoc, QueryDocumentSnapshot, collection, getDocs } from 'firebase/firestore';
import { DateAdapter } from '@angular/material/core';


enum SortStrategy {
  Neutral,
  Ascending,
  Descending,
}
enum SortType {
  None = "None",
  Name = "Name",
  UploadDate = "Upload date",
  FileSize = "File size",
}

@Component({
  selector: 'app-pfp-container',
  templateUrl: './pfp-container.component.html',
  styleUrl: './pfp-container.component.scss'
})
export class PfpContainerComponent implements OnInit {
  // Allows the use of enum in HTML
  Size = Size;
  SortStrategy = SortStrategy;
  SortType = SortType;
  sortTypeValues = Object.values(SortType);
  faUpload = faUpload;
  faUnsorted = faSort;
  faAscSort = faSortDown;
  faDescSort = faSortUp;

  currentSize = Size.MEDIUM;
  currentSortStrategy = SortStrategy.Neutral;
  currentSortType = SortType.None;

  _searchBarFilter: string = "";
  set searchBarFilter(event: any) {
    this._searchBarFilter = event.target.value.toLowerCase();
    this.filter()
  }

  // Initialize Firebase
  readonly app = initializeApp(firebaseConfig);
  readonly pfpsRef = ref(getStorage(this.app), "pfps");
  readonly firestore = getFirestore(this.app);

  pfps: Pfp[] = [];
  pfpsFiltered: Pfp[] = [];

  constructor(private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadPfps()
  }

  loadPfps() {
    this.pfps = [];

    getDocs(collection(this.firestore, "app/pfps/pfps_obj"))
      .then(data => {
        data.docs.forEach((doc: any) => {
          let pfp = pfpConverter.fromFirestore(doc.data())
          pfp.id = doc.id
          this.pfps.push(pfp)
        })
      }
    )
    // getDoc(doc(this.firestore, "app", "pfps")).then(data => {
    //   let info = data.data();
    //   if (info !== undefined) {
    //     for(let pfp of info['pfps']) {
    //       this.pfps.push(pfpConverter.fromFirestore(pfp))
    //     }
    //   }
    // })
    this.pfpsFiltered = this.pfps;
  }

  uploadFile(event: any) {
    let file: File = event.target.files[0];
    // 1000000 bytes = 1Mo
    if (file.size > 1000000) {
      this.snackBar.open('File cannot exceed 1Mo', undefined, { duration: 3000, panelClass: ["warning-snackbar"] });
    }
    else {
      // We check if the user has authorization to upload
      this.dialog.open(IdentityDialogComponent)
        // Whe get password
        .afterClosed().subscribe(result => {
          if (!result) return;
          // If pwd ok, we upload the file
          if (result === firebaseConfig.adminOkPwd) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            // We read the file as a Blob and upload the bytes to the server
            reader.onload = () => {
              if (reader.result) {
                const blob = new Blob([reader.result], { type: file.type });
                uploadBytes(ref(getStorage(this.app), `pfps/${file.name}`), blob).then((snapshot) => {
                  getDownloadURL(snapshot.ref).then(async url => {
                    let pfp = new Pfp(snapshot.ref.name.split(".")[0], snapshot.ref.name, url, new Date(snapshot.metadata.timeCreated), snapshot.metadata.size, this.pfps.length, [], [])
                    let ref = await addDoc(collection(this.firestore, "app/pfps/pfps_obj"), pfpConverter.toFirestore(pfp))
                    pfp.id = ref.id
                    this.pfps.push(pfp)
                    this.filter()
                  })
                })
                  // Upload succesful
                  .then(() => this.snackBar.open('File uploaded succesfully !', undefined, { duration: 3000, panelClass: ["ok-snackbar"] }))
                  // Error during upload
                  .catch((error) => {
                    console.log(error);
                    this.snackBar.open('An error occured during the upload, please try again', undefined, { duration: 3000, panelClass: ["error-snackbar"] })
                  });
              }
            };
          }
          else {
            this.snackBar.open('Wrong password...', undefined, { duration: 3000, panelClass: ["warning-snackbar"] })
          }
        });
    }
  }

  filter() {
    this.pfpsFiltered = this.pfps.filter(pfp => {
      let nameOk = pfp.name.trim().toLowerCase().includes(this._searchBarFilter);
      let tagOk = pfp.tags.find(tag => tag.includes(this._searchBarFilter))
      return nameOk || tagOk
    });
    let sortingStrategy;
    if (this.currentSortStrategy === SortStrategy.Neutral || this.currentSortType === SortType.None) {
      this.currentSortStrategy = SortStrategy.Neutral;
      sortingStrategy = Pfp.compareFnOrder;
    }
    else {
      switch (this.currentSortType) {
        case SortType.Name:
          sortingStrategy = Pfp.compareFnName; break;
        case SortType.UploadDate:
          sortingStrategy = Pfp.compareFnUploadDate; break;
        case SortType.FileSize:
          sortingStrategy = Pfp.compareFnFileSize; break;
      }
    }
    this.pfpsFiltered.sort(sortingStrategy)
    if (this.currentSortStrategy === SortStrategy.Descending) this.pfpsFiltered.reverse();
  }

  async openFileExplorerDialog() {
    // for (let pfp of this.pfps) {
    //   let ref = await addDoc(collection(this.firestore, "app/pfps/pfps_obj"), pfpConverter.toFirestore(pfp))
    //   pfp.id = ref.id;
    // }
    document.getElementById('uploadPfpInput')?.click();
  }
}

