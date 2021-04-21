import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartPageComponent } from './start-page/start-page.component';
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import { AbortDialogComponent } from './abort-dialog/abort-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    SidenavContentComponent,
    LoginComponent,
    RegisterComponent,
    AbortDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
