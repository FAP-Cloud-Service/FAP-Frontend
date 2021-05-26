import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {MaterialModule} from './modules/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StartPageComponent} from './start-page/start-page.component';
import {SidenavContentComponent} from './sidenav-content/sidenav-content.component';
import {LoginComponent} from './login/login.component';

import {ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import {AbortDialogComponent} from './abort-dialog/abort-dialog.component';
import {CookieService} from 'ngx-cookie-service';
import {LogoutVerificationComponent} from './logout-verification/logout-verification.component';
import {FreundeComponent} from './friendslist/freunde.component';
import {ErrorComponent} from './error/error.component';
import {SaveLocationComponent} from './save-location/save-location.component';
import {FriendsDetailComponent} from './friends-detail/friends-detail.component';
import {FriendsmapComponent} from './friendsmap/friendsmap.component';
import {DisplayNamePipe} from './pipes/display-name.pipe';
import {SaveLocationManualComponent} from './save-location/save-location-manual/save-location-manual.component';
import {SaveLocationGeolocationComponent} from './save-location/save-location-geolocation/save-location-geolocation.component';
import {GoogleMapsComponent} from './google-maps/google-maps.component';
import {AgmCoreModule} from '@agm/core';
import { WatchListComponent } from './watch-list/watch-list.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    SidenavContentComponent,
    LoginComponent,
    RegisterComponent,
    AbortDialogComponent,
    LogoutVerificationComponent,
    FreundeComponent,
    ErrorComponent,
    SaveLocationComponent,
    FriendsDetailComponent,
    FriendsmapComponent,
    DisplayNamePipe,
    SaveLocationManualComponent,
    SaveLocationGeolocationComponent,
    GoogleMapsComponent,
    WatchListComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBAjBQ4sV1ykQCBD2DHN5DwH9OjuejnkGk'
    })
  ],
  providers: [
    CookieService,
    DisplayNamePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
