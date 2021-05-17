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
import { Friend, FriendList, FriendMarker } from '../interfaces/friends';


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
  friendList: Array<Friend>;
  querySuccessful: boolean;
  errorMessage: string;
  loading = true;
  session: SessionSettings;

  markers: Array<any> = new Array();

  constructor(
    private locationService: LocationService,
    private friendsService: FriendsService,
    private snackBar: MatSnackBar,
    private mapService: MapService,
    private sessionService: SessionService,
    private dialog: MatDialog) {
      this.session = this.sessionService.getSession();
  }

  private initMap(friendsArray: Array<FriendMarker>): void {

    this.map = this.mapService.getMap('map', 51.1642292, 10.4541194, 10);

    if (friendsArray.length == 0) {
      return;
    }

    for (const friend of friendsArray) {
      const marker = L.marker([friend.latitude, friend.longitude]);
      const popUpHtml = `<div>Name: ${friend.name}</div>` +
        `<div>Longitude: ${friend.longitude}</div>` +
        `<div>Latitude: ${friend.latitude}</div>`;
      marker.bindPopup(popUpHtml);
      marker.addTo(this.map);
      this.markers.push(marker);
    }
    const group = L.featureGroup(this.markers);
    this.map.fitBounds(group.getBounds());
  }

  async getFriends(): Promise<Array<FriendMarker>> {
    const friendsArray: Array<FriendMarker> = new Array<FriendMarker>();
    try {
      const response = await this.friendsService.getAllFriends().toPromise();
      if (response) {
        this.querySuccessful = true;
        for (const friend of response.benutzerliste) {
          const responseLoc = await this.locationService.getLocationByUser(friend.loginName).toPromise();
          if (responseLoc) {
            const friendObj: FriendMarker = {name: friend.loginName, latitude: responseLoc.breitengrad, longitude: responseLoc.laengengrad};
            friendsArray.push(friendObj);
          }
        }
      }
    } catch (err) {
      this.querySuccessful = false;
      console.error('Error while retrieving friends:', err);
      if (err.status == 401) {
        this.snackBar.open('Fehler beim validieren der Login-Daten, bitte melden sie sich erneut an.', 'Erneut Anmelden').onAction().subscribe(() => {
          this.selectedPage.emit('login');
        });
        this.loading = false;
      } else {
        this.snackBar.open('Beim Laden deiner Freunde ist ein Fehler aufgetreten...', '', {duration: 5000});
      }
    }
    return friendsArray;
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
      })
    });
  }

  ngAfterViewInit(): void {
    this.getFriends().then((friendsArray) => {
      this.initMap(friendsArray);
      this.loading = false;
    });
  }

}
