import { Component, OnInit } from '@angular/core';

import { firebaseConfig } from '../../env/firebase.config';
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getMetadata, getDownloadURL, uploadBytes, UploadMetadata } from "firebase/storage";
import { Pfp } from '../shared/models/pfp.model';
import { Size } from '../shared/models/size.enum';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-pfp-container',
  templateUrl: './pfp-container.component.html',
  styleUrl: './pfp-container.component.scss'
})
export class PfpContainerComponent implements OnInit {
  // Allows the use of enum in HTML
  Size = Size;

  currentSize = Size.MEDIUM;

  // Initialize Firebase
  readonly app = initializeApp(firebaseConfig);
  readonly pfpsRef = ref(getStorage(this.app), "pfps");

  pfps: Pfp[] = [];
  pfpsFiltered: Pfp[] = [];

  constructor(private snackBar: MatSnackBar) { }

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
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        if (reader.result) {
          console.log(this.pfpsRef)
          const blob = new Blob([reader.result], { type: file.type });
          uploadBytes(ref(getStorage(this.app), `pfps/${file.name}`), blob).then((snapshot) => {
            this.loadPfps();
          })
          .then(() => this.snackBar.open('File uploaded succesfully !', undefined, { duration: 3000, panelClass: ["ok-snackbar"] }))
          .catch(() => this.snackBar.open('An error occured during the upload, please try again', undefined, { duration: 3000, panelClass: ["error-snackbar"] }));
        }
      };
    }
  }

  filter(event: any) {
    let nameFilter = event.target.value.trim().toLowerCase();
    this.pfpsFiltered = this.pfps.filter(pfp => pfp.name.trim().toLowerCase().includes(nameFilter))
  }

}

