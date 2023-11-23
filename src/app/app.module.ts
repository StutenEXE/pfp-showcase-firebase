import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { PfpContainerComponent } from './pfp-container/pfp-container.component';
import { PfpBoxComponent } from './pfp-container/pfp-box/pfp-box.component';
import { BrowserModule } from '@angular/platform-browser';
import { StutenSearchbarComponent } from './shared/component/stuten-searchbar/stuten-searchbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IdentityDialogComponent } from './shared/component/identity-dialog/identity-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    PfpContainerComponent,
    PfpBoxComponent,
    StutenSearchbarComponent,
    IdentityDialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent],
})
export class AppModule { }
