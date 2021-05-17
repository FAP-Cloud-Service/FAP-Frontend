import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LocationService} from '../services/location.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {MapComponent} from "../map/map.component";

@Component({
  selector: 'app-save-location',
  templateUrl: './save-location.component.html',
  styleUrls: ['./save-location.component.scss']
})
export class SaveLocationComponent {
  latitude: any;
  longitude: any;
  loading = false;
  dialog: MatDialog;
  constructor(public dialogRef: MatDialogRef<any>, private locationService: LocationService, private snackBar: MatSnackBar) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  /*
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
 */
}
