import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { PfpContainerComponent } from './pfp-container/pfp-container.component';
import { PfpBoxComponent } from './pfp-container/pfp-box/pfp-box.component';
import { BrowserModule } from '@angular/platform-browser';
import { StutenSearchbarComponent } from './shared/component/stuten-searchbar/stuten-searchbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    PfpContainerComponent,
    PfpBoxComponent,
    StutenSearchbarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent],
})
export class AppModule { }
