import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { PfpContainerComponent } from './pfp-container/pfp-container.component';
import { PfpComponent } from './pfp-container/pfp/pfp.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    AppComponent,
    PfpContainerComponent,
    PfpComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent],
})
export class AppModule { }
