import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-save-location-geolocation',
  templateUrl: './save-location-geolocation.component.html',
  styleUrls: ['./save-location-geolocation.component.scss']
})
export class SaveLocationGeolocationComponent implements OnInit {
  latitude: any;
  longitude: any;
  positionForm: FormGroup = new FormGroup({
    latitude: new FormControl('', Validators.required),
    longitude: new FormControl('', Validators.required)
  });
  constructor() { }

  ngOnInit(): void {
    this.getGeoPosition();
  }
  getGeoPosition(): void {
    navigator.geolocation.getCurrentPosition((position => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.positionForm.controls.latitude.setValue(this.latitude);
      this.positionForm.controls.longitude.setValue(this.longitude);
      this.positionForm.disable();
    }));
  }
  changeFormState(): void {
    if (this.positionForm.enabled) {
      this.positionForm.disable();
    }
    else {
      this.positionForm.enable();
    }
  }
}
