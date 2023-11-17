import { Component, OnInit } from '@angular/core';

import { firebaseConfig } from '../../env/firebase.config';
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getMetadata, getDownloadURL } from "firebase/storage";
import { Pfp } from '../shared/models/pfp.model';
import { Size } from '../shared/models/size.enum';

@Component({
  selector: 'app-pfp-container',
  templateUrl: './pfp-container.component.html',
  styleUrl: './pfp-container.component.scss'
})
export class PfpContainerComponent implements OnInit {
  // Allows the use of enum in HTML0
  Size = Size

  currentSize = Size.MEDIUM;

  // Initialize Firebase
  readonly app = initializeApp(firebaseConfig);
  readonly pfpsRef = ref(getStorage(this.app), "pfps");

  pfps: Pfp[] = [];
  pfpsFiltered: Pfp[] = [];

  ngOnInit(): void {
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

}

