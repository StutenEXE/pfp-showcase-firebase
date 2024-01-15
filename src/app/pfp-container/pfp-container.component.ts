import { Component, OnInit } from '@angular/core';
import { faSortAlphaAsc, faSortAlphaDesc, faUpload } from '@fortawesome/free-solid-svg-icons';

import { firebaseConfig } from '../../env/firebase.config';
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getMetadata, getDownloadURL, uploadBytes } from "firebase/storage";
import { Pfp, pfpConverter } from '../shared/models/pfp.model';
import { Size } from '../shared/models/size.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IdentityDialogComponent } from '../shared/component/identity-dialog/identity-dialog.component';
import { doc, getFirestore, getDoc, arrayUnion, setDoc, addDoc, updateDoc, QueryDocumentSnapshot } from 'firebase/firestore';


@Component({
  selector: 'app-pfp-container',
  templateUrl: './pfp-container.component.html',
  styleUrl: './pfp-container.component.scss'
})
export class PfpContainerComponent implements OnInit {
  // Allows the use of enum in HTML
  Size = Size;
  faUpload = faUpload;
  faAscSort = faSortAlphaAsc;
  faDescSort = faSortAlphaDesc;

  currentSize = Size.MEDIUM;
  sortedAsc = true;

  _titleFilter: string = "";
  set titleFilter(event: any) {
    this._titleFilter = event.target.value.toLowerCase();
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
    // let res = doc(this.firestore, "app", "tags")
    // getDoc(res).then(info => console.log(info.data()))

    // this.pfps.forEach(pfp => {
    //   console.log(pfp)
    //   const data = {
    //     pfps: arrayUnion(pfpConverter.toFirestore(pfp))
    //   }
    //   updateDoc(doc(this.firestore, "app", "pfps"), data)

    // })
  }

  loadPfps() {
    this.pfps = [];

    getDoc(doc(this.firestore, "app", "pfps"))
      .then(data => {
        data.data()?.['pfps'].forEach((pfp: any) => {
          this.pfps.push(pfpConverter.fromFirestore(pfp))
        })
      }
      )
      .then(() =>
        listAll(this.pfpsRef)
          .then(pfps => {
            pfps.items.forEach(pfpRef => {
              getMetadata(pfpRef)
                .then(metadata => {
                  this.pfps.forEach(pfp => {
                    // console.log(`${pfp.size} == ${metadata.size} : ${metadata.size == pfp.size}`)
                    pfp.size == metadata.size ? pfp.filename = pfpRef.name : 0
                  });
                }).then(() => {
                  this.pfps.forEach(pfp => {
                    console.log(pfp.filename)
                    const data = {
                      pfps: arrayUnion(pfpConverter.toFirestore(pfp))
                    }
                    updateDoc(doc(this.firestore, "app", "pfps"), data)
                  });
                });
            })
          })
      )


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
                  this.loadPfps();
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
      return pfp.name.trim().toLowerCase().includes(this._titleFilter)
    });
    this.pfpsFiltered.sort(Pfp.compareFn)
    if (!this.sortedAsc) this.pfpsFiltered.reverse();
  }

  openFileExplorerDialog() {
    document.getElementById('uploadPfpInput')?.click();
  }

}

