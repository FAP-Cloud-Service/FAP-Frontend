import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FriendLocation} from '../../interfaces/location';
import {Friend} from '../../interfaces/friends';
@Component({
  selector: 'app-save-location-geolocation',
  templateUrl: './save-location-geolocation.component.html',
  styleUrls: ['./save-location-geolocation.component.scss']
})
export class SaveLocationGeolocationComponent implements OnInit {
  @Output() locationReceived: EventEmitter<FriendLocation> = new EventEmitter<FriendLocation>();
  friendLocation: FriendLocation;
  constructor() { }

  ngOnInit(): void {
    this.getGeoPosition();
  }
  getGeoPosition(): void {
    navigator.geolocation.getCurrentPosition((position => {
      this.friendLocation = {
        breitengrad: position.coords.latitude,
        laengengrad: position.coords.longitude
      };
      this.locationReceived.emit(this.friendLocation);
    }));
  }
}
