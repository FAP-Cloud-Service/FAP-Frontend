import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import * as L from 'leaflet';
import {LocationService} from '../services/location.service';
import {FriendsService} from '../services/friends.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MapService} from '../services/map.service';
import { SaveLocationComponent } from '../save-location/save-location.component';
import { MatDialog } from '@angular/material/dialog';
import { SessionService } from '../services/session.service';
import { SessionSettings } from '../interfaces/session';
import {FriendMapLocation} from '../interfaces/location';


const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-friendsmap',
  templateUrl: './friendsmap.component.html',
  styleUrls: ['./friendsmap.component.scss']
})
export class FriendsmapComponent implements AfterViewInit {

  @Output() selectedPage = new EventEmitter<string>();

  map: any;
  friendList: FriendMapLocation[];
  querySuccessful: boolean;
  errorMessage: string;
  loading = true;
  session: SessionSettings;

  markers: Array<any> = [];

  constructor(
    private locationService: LocationService,
    private friendsService: FriendsService,
    private snackBar: MatSnackBar,
    private sessionService: SessionService,
    private dialog: MatDialog) {
      this.session = this.sessionService.getSession();
  }
  async getFriends(): Promise<any> {
    try {
      const friendsArray: { name: string; latitude: number; longitude: number; }[] = [];
      const response = await this.friendsService.getAllFriends().toPromise();
      if (response) {
        this.querySuccessful = true;
        for (const friend of response.benutzerliste) {
          const responseLoc = await this.locationService.getLocationByUser(friend.loginName).toPromise();
          if (responseLoc) {
            const friendObj = {name: '', latitude: 0, longitude: 0};
            friendObj.name = friend.loginName;
            friendObj.latitude = responseLoc.breitengrad;
            friendObj.longitude = responseLoc.laengengrad;
            friendsArray.push(friendObj);
          }
        }
      } else {
        this.querySuccessful = false;
        this.snackBar.open('Beim Laden deiner Freunde ist ein Fehler aufgetreten...', '', {duration: 5000});
      }
      return friendsArray;
    } catch (error) {
      this.snackBar.open('Beim Laden deiner Freunde ist ein Fehler aufgetreten...', '', {duration: 5000});
    }
  }

  openSaveLocationDialog(): void {
    this.dialog.open(SaveLocationComponent).afterClosed().subscribe(() => {
      this.locationService.getLocationByUser(this.session.username).subscribe(location => {
        const marker = L.marker([location.breitengrad, location.laengengrad]);
        const popUpHtml = `<div>Name: ${this.session.username}</div>` +
          `<div>Longitude: ${location.breitengrad}</div>` +
          `<div>Latitude: ${location.laengengrad}</div>`;
        marker.bindPopup(popUpHtml);
        marker.addTo(this.map);
        this.markers.push(marker);
      });
    });
  }

  ngAfterViewInit(): void {
    this.getFriends().then(() => {
      this.loading = false;
    });
  }

}
