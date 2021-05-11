import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import * as L from 'leaflet';
import {LocationService} from '../services/location.service';
import {FriendsService} from '../services/friends.service';
import {detect} from 'detect-browser';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MapService} from '../services/map.service';


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
export class FriendsmapComponent implements OnInit, AfterViewInit {

  constructor(private locationService: LocationService, private friendsService: FriendsService, private snackBar: MatSnackBar, private mapService: MapService) {
  }

  @Output() selectedPage = new EventEmitter<string>();

  map: any;
  friendList: any[];
  querySuccessful: boolean;
  errorMessage: string;
  loading = true;

  private initMap(friendsArray: any): void {

    this.map = this.mapService.getMap('map', 51.1642292, 10.4541194, 10);

    const markers: any[] = [];
    for (const friend of friendsArray) {
      const marker = L.marker([friend.latitude, friend.longitude]);
      const popUpHtml = `<div>Name: ${friend.name}</div>` +
        `<div>Longitude: ${friend.longitude}</div>` +
        `<div>Latitude: ${friend.latitude}</div>`;
      marker.bindPopup(popUpHtml);
      marker.addTo(this.map);
      markers.push(marker);
    }
    const group = L.featureGroup(markers);
    this.map.fitBounds(group.getBounds());
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

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getFriends().then((friendsArray) => {
      this.initMap(friendsArray);
      this.loading = false;
    });
  }

}
