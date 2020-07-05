import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VisitorFormComponent } from './VisitorForm/visitor-form.component';
import { LatestNewsComponent } from './LatestNews/latest-news.component'
import { AppRoutingModule } from './app.routing'
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {SafePipe} from './safe.pipe'
@NgModule({
  declarations: [
    AppComponent,
    VisitorFormComponent,
    LatestNewsComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
