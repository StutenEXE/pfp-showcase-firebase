import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Pfp, pfpConverter } from '../shared/models/pfp.model';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../env/firebase.config';
import { BytesPipe } from '../shared/utils/bytes-pipe';

@Component({
    selector: 'app-pfp-details',
    standalone: true,
    templateUrl: './pfp-details.component.html',
    styleUrl: './pfp-details.component.scss',
    imports: [CommonModule, BytesPipe]
})
export class PfpDetailsComponent implements OnInit {

  // Initialize Firebase
  readonly app = initializeApp(firebaseConfig);
  readonly firestore = getFirestore(this.app);

  pfp!: Pfp;

  constructor(private _route: ActivatedRoute) { }

 ngOnInit() {
    let id = this._route.snapshot.paramMap.get("id");
    if (id) {
      getDoc(doc(this.firestore, "app", "pfps", "pfps_obj", id)).then(doc => {
        this.pfp = pfpConverter.fromFirestore(doc.data())
        this.pfp.id = id ? id : "";
      })
    }

  }

}
