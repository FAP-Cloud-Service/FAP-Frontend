import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LocationService} from '../services/location.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Address, FriendLocation, Location} from '../interfaces/location';
import {Friend} from '../interfaces/friends';

@Component({
  selector: 'app-save-location',
  templateUrl: './save-location.component.html',
  styleUrls: ['./save-location.component.scss']
})
export class SaveLocationComponent {
  latitude: any;
  longitude: any;
  submitDisabled = true;
  addressFormValues: Address;
  loading = true;
  dialog: MatDialog;
  constructor(public dialogRef: MatDialogRef<any>, private locationService: LocationService, private snackBar: MatSnackBar) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  locationReceivedHandler(location: FriendLocation): void {
    this.latitude = location.breitengrad;
    this.longitude = location.laengengrad;
    this.loading = false;
    this.submitDisabled = false;
    this.snackBar.open('Standort wurde ermittelt', '', {duration: 5000});
  }
  addressReceivedHandler(address: Address): void {
    this.addressFormValues = address;
    this.locationService.getCoordinatesByAddress(address.country, address.zip, address.city, address.street).subscribe(
      (res: {standort: FriendLocation}) => {
        console.log('Response erhalten: ' + JSON.stringify(res, null, 2));
        this.latitude = res.standort.breitengrad;
        this.longitude = res.standort.laengengrad;
        this.snackBar.open('Du befindest dich in der Stadt ' + address.city);
      },
    () => {
        this.snackBar.open('Diese Addresse konnte nicht zugeordnet werden', '', {duration: 6000});
    }
    );
  }
  submitLocation(): any {
    this.loading = true;
    this.locationService.submitLocation(this.latitude, this.longitude).subscribe(
      () => {
        this.dialogRef.close();
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open('Ein Fehler ist aufgetreten: ' + error.status, '', {duration: 6000});
        this.loading = false;
      }
    );
  }
}
