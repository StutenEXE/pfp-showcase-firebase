import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-stuten-searchbar',
  templateUrl: './stuten-searchbar.component.html',
  styleUrl: './stuten-searchbar.component.scss'
})
export class StutenSearchbarComponent {
  @Output() keyUp = new EventEmitter<KeyboardEvent>();


}
