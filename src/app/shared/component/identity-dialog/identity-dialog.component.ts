import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-identity-dialog',
  templateUrl: './identity-dialog.component.html',
  styleUrl: './identity-dialog.component.scss'
})
export class IdentityDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<IdentityDialogComponent>
  ) { }

  pwd: string = "";

  onNoClick(): void {
    this.dialogRef.close();
  }
}
