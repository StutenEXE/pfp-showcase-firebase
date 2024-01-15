import { Component, Input, OnInit } from '@angular/core';
import { Pfp } from '../../shared/models/pfp.model';
import { Size } from '../../shared/models/size.enum';
import { getStorage, ref, getBlob } from "firebase/storage";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-pfp-box',
  templateUrl: './pfp-box.component.html',
  styleUrl: './pfp-box.component.scss'
})
export class PfpBoxComponent implements OnInit {
  @Input({ required: true }) pfp!: Pfp;
  @Input({ required: true }) size!: Size;

  showHuge: boolean = false;

  downloadUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (this.pfp.filename) {
      getBlob(ref(getStorage(), `pfps/${this.pfp.filename}`))
        .then((blob) => {
          this.downloadUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        })
        .catch((error) => {
          alert("Cannot find image")
        });
    }
  }

} 
