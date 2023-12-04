import { Component, OnInit } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import { firebaseConfig } from '../../env/firebase.config';
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getMetadata, getDownloadURL, uploadBytes, UploadMetadata } from "firebase/storage";
import { Pfp } from '../shared/models/pfp.model';
import { Size } from '../shared/models/size.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IdentityDialogComponent } from '../shared/component/identity-dialog/identity-dialog.component';


@Component({
  selector: 'app-pfp-container',
  templateUrl: './pfp-container.component.html',
  styleUrl: './pfp-container.component.scss'
})
export class PfpContainerComponent implements OnInit {
  // Allows the use of enum in HTML
  Size = Size;
  faUpload = faUpload;

  currentSize = Size.MEDIUM;

  _titleFilter: string = "";
  set titleFilter(event: any) {
    this._titleFilter = event.target.value.toLowerCase();
    this.filter()
  }

  // Initialize Firebase
  readonly app = initializeApp(firebaseConfig);
  readonly pfpsRef = ref(getStorage(this.app), "pfps");

  pfps: Pfp[] = [];
  pfpsFiltered: Pfp[] = [];

  constructor(private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadPfps()
  }

  loadPfps() {
    this.pfps = [];

    listAll(this.pfpsRef)
      .then(pfps => {
        pfps.items.forEach(pfpRef => {
          let pfp = new Pfp();
          pfp.name = pfpRef.name;

          getDownloadURL(pfpRef)
            .then(url => {
              pfp.url = url
            });

          getMetadata(pfpRef)
            .then(metadata => {
              pfp.uploadDate = new Date(metadata.timeCreated)
              pfp.size = metadata.size
              // Cache control contains an order for the pfpz
              pfp.order = Number(metadata.cacheControl)
            });
          this.pfps.push(pfp);
        });
      })
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
    console.log(this.pfps);
    this.pfpsFiltered = this.pfps.filter(pfp => { 
      return pfp.name.trim().toLowerCase().includes(this._titleFilter) 
    });
    this.pfpsFiltered.sort(Pfp.compareFn);
  }

  openFileExplorerDialog() {
    document.getElementById('uploadPfpInput')?.click();
  }

}

