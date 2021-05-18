import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ZipcodeService} from '../../services/zipcode.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Address, FriendLocation} from '../../interfaces/location';

@Component({
  selector: 'app-save-location-manual',
  templateUrl: './save-location-manual.component.html',
  styleUrls: ['./save-location-manual.component.scss']
})
export class SaveLocationManualComponent implements OnInit {
  @Output() manualLocation = new EventEmitter<Address>();
  addressForm = new FormGroup({
    street: new FormControl('', Validators.required),
    zip: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(5), Validators.pattern(/^[0-9]*$/)]),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required)
  });
  constructor(private zipcodeService: ZipcodeService, private snackBar: MatSnackBar) {
    this.addressForm.valueChanges.subscribe(
      (data: Address) => {
        if (this.addressForm.valid) {
          this.manualLocation.emit(data);
        }
      }
    );
  }

  ngOnInit(): void {
  }
  checkZipCodeInput(): void {
    this.zipcodeService.getCityByZipCode(this.addressForm.controls.zip.value).subscribe(
      (response) => {
        if ( response.records.length <= 3 && response.records.length >= 1 ) {
          this.addressForm.controls.city.setValue(response.records[0].fields.plz_name);
          this.addressForm.controls.zip.setValue(response.records[0].fields.plz_code);
        } else {
          this.snackBar.open('Die eingegebene Postleitzahl ist ungültig', '', { duration: 5000 });
          this.addressForm.controls.city.setValue('');
        }
      }
    );
    this.addressForm.enable();
  }
  disableCityInput(): void {
    this.addressForm.controls.city.setValue('');
    this.addressForm.controls.city.disable();
  }
}
