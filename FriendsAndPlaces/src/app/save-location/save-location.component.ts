import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {LocationService} from '../services/location.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-save-location',
  templateUrl: './save-location.component.html',
  styleUrls: ['./save-location.component.scss']
})
export class SaveLocationComponent implements OnInit {
  latitude: any;
  longitude: any;
  loading = false;
  positionForm: FormGroup = new FormGroup({
    latitude: new FormControl('', Validators.required),
    longitude: new FormControl('', Validators.required)
  });

  constructor(public dialogRef: MatDialogRef<any>, private locationService: LocationService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getGeoPosition();
  }

  closeDialog(): void {
    this.dialogRef.close();
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

  submitLocation(): any {
    this.loading = true;
    const positionFormControls = this.positionForm.controls;
    this.locationService.submitLocation(positionFormControls.latitude.value, positionFormControls.longitude.value).subscribe(
      () => {
        this.dialogRef.close();
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open('Ein Fehler ist aufgetreten: ' + error.status, '', {duration: 6000});
        this.loading = false;
      }
    );
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
