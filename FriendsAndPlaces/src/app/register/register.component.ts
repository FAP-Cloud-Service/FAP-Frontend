import { Component, OnInit, Input } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CountryService } from '../services/country.service';
import {ZipcodeService} from '../services/zipcode.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {AbortDialogComponent} from "../abort-dialog/abort-dialog.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading = false;
  countryLoading = false;
  countries: any;
  heading = 'Neuen Account anlegen...';
  countryOptions: string[] = [];
  observableCountryOptions: Observable<string[]>;
  personalForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required)
  });
  addressForm = new FormGroup({
    street: new FormControl('', Validators.required),
    zip: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(5)]),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required)
  });
  contactForm = new FormGroup({
    mobile: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  accountForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    passwordConfirm: new FormControl('', Validators.required),
    termsOfService: new FormControl('', Validators.requiredTrue)
  });
  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private countryService: CountryService,
    private zipcodeService: ZipcodeService,
    private snackBar: MatSnackBar,
    public abortDialog: MatDialog)
  { }
  closeDialog(): void {
    this.dialogRef.close();
  }
  submit(): void {
    this.heading = 'Account wird erstellt. Bitte warten...';
    this.loading = true;
    this.addressForm.disable();
    this.accountForm.disable();
    this.contactForm.disable();
    this.personalForm.disable();
  }
  ngOnInit(): void {
    this.observableCountryOptions = this.addressForm.controls.country.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.loadCountries();
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return  this.countryOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  loadCountries(): void {
    this.countryLoading = true;
    this.countryService.getAllCountries().subscribe(
      (countries) => {
        this.countries = countries;
        for (const key in this.countries.data) {
          if (this.countries.data.hasOwnProperty(key)) {
             this.countryOptions.push(this.countries.data[key].country);
          }
        }
        this.countryLoading = false;
      }
    );
  }
  checkZipCodeInput(): void {
    this.zipcodeService.getCityByZipCode(this.addressForm.controls.zip.value).subscribe(
      (response) => {
        if ( response.records.length <= 3 && response.records.length >= 1 ) {
          console.log(response.records);
          console.log(response.records[0].fields.plz_name);
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
  openAbortDialog(): void {
    const abortDialogRef = this.abortDialog.open(AbortDialogComponent);
    abortDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Die Registrierung wurde abgebrochen', '', { duration: 5000 });
        this.dialogRef.close();
      }
    });
  }
}
