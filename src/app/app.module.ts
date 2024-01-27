import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { routes } from './app.routes';

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
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
