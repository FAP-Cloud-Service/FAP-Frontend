import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {LocationService} from "../services/location.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-save-location',
  templateUrl: './save-location.component.html',
  styleUrls: ['./save-location.component.scss']
})
export class SaveLocationComponent implements OnInit {
  latitude: number;
  longitude: number;
  constructor(public dialogRef: MatDialogRef<any>, private locationService: LocationService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  getUserLocation(): void {
    console.log('Frage Standortdaten ab');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          console.log('Standortdaten wurden abgefragt');
        }
      );
    }
    else {
      this.snackBar.open('Standortabfrage ist auf diesem Gerät nicht verfügbar');
    }
  }
  submitLocation(): any {
    if (this.latitude && this.longitude) {
      this.locationService.submitLocation(this.latitude, this.longitude);
    }
    else {
      this.snackBar.open('Dein Standort ist nicht verfügbar', '', { duration: 5000 });
    }
  }
}
