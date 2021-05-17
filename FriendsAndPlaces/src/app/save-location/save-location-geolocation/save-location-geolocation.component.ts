import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-save-location-geolocation',
  templateUrl: './save-location-geolocation.component.html',
  styleUrls: ['./save-location-geolocation.component.scss']
})
export class SaveLocationGeolocationComponent implements OnInit {
  latitude: any;
  longitude: any;
  constructor() { }

  ngOnInit(): void {
    this.getGeoPosition();
  }
  getGeoPosition(): void {
    navigator.geolocation.getCurrentPosition((position => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    }));
  }
}
