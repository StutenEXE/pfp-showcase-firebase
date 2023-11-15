import { Component, Input } from '@angular/core';
import { Pfp } from '../../shared/models/pfp.model';
import { Size } from '../../shared/models/size.enum';

@Component({
  selector: 'app-pfp-box',
  templateUrl: './pfp-box.component.html',
  styleUrl: './pfp-box.component.scss'
})
export class PfpBoxComponent {
  @Input({ required: true }) pfp!: Pfp;
  @Input({ required: true }) size!: Size;

  showHuge: boolean = false;

  download(event: Event) {
    event.stopPropagation();
  }
} 
