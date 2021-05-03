import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CountryService } from '../services/country.service';
import {ZipcodeService} from '../services/zipcode.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AbortDialogComponent} from '../abort-dialog/abort-dialog.component';
import {UserRegister} from '../interfaces/User';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // variables
  loading = false;
  countryLoading = false;
  countries: any;
  heading = 'Neuen Account anlegen...';
  countryOptions: string[] = [];
  observableCountryOptions: Observable<string[]>;
  passwordsNotEqual: boolean;
  // stepper forms
  personalForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required)
  });
  addressForm = new FormGroup({
    street: new FormControl('', Validators.required),
    zip: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(5), Validators.pattern(/^[0-9]*$/)]),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required)
  });
  contactForm = new FormGroup({
    mobile: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  accountForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern(/^[\S]+$/)]),
    password: new FormControl('', [Validators.required]),
    passwordConfirm: new FormControl('', Validators.required),
    termsOfService: new FormControl('', Validators.requiredTrue)
  });
  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private countryService: CountryService,
    private zipcodeService: ZipcodeService,
    private snackBar: MatSnackBar,
    public abortDialog: MatDialog,
    private userService: UserService)
  { }
  // api calls
  submit(): void {
    this.heading = 'Account wird erstellt. Bitte warten...';
    this.loading = true;
    this.addressForm.disable();
    this.accountForm.disable();
    this.contactForm.disable();
    this.personalForm.disable();
    const personalFormControls = this.personalForm.controls;
    const addressFormControls = this.addressForm.controls;
    const contactFormControls = this.contactForm.controls;
    const accountFormControls = this.accountForm.controls;
    const payload = new UserRegister(
      accountFormControls.username.value,
      {passwort: accountFormControls.password.value},
      personalFormControls.firstName.value,
      personalFormControls.lastName.value,
      addressFormControls.street.value,
      addressFormControls.zip.value,
      addressFormControls.city.value,
      addressFormControls.country.value,
      contactFormControls.mobile.value,
      {adresse: contactFormControls.email.value}
    );
    console.log(payload);
    this.userService.performRegistration(payload).subscribe(
      (response) => {
        this.snackBar.open('Der Benutzer "' + accountFormControls.username.value + '" wurde angelegt');
        this.dialogRef.close(accountFormControls.username.value);
      },
      (error) => {
        this.loading = false;
        this.addressForm.enable();
        this.accountForm.enable();
        this.contactForm.enable();
        this.personalForm.enable();
        this.snackBar.open('Der benutzer konnte nicht angelegt werden. Fehlercode ' + error.status);
      },
      () => {}
  );
  }
  ngOnInit(): void {
    this.observableCountryOptions = this.addressForm.controls.country.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.loadCountries();
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
  // Utility
  openAbortDialog(): void {
    const abortDialogRef = this.abortDialog.open(AbortDialogComponent);
    abortDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Die Registrierung wurde abgebrochen', '', { duration: 5000 });
        this.dialogRef.close();
      }
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  disableCityInput(): void {
    this.addressForm.controls.city.setValue('');
    this.addressForm.controls.city.disable();
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return  this.countryOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  getValidationError(formControlName: any, errorType: string, message: string): string {
    if (formControlName.hasError('required')) {
      return 'Pflichtfeld';
    }
    return formControlName.hasError(errorType) ? message : '';
  }
  getPassowrdError(): string | null {
    if (this.accountForm.controls.password.value !== this.accountForm.controls.passwordConfirm.value) {
      this.passwordsNotEqual = true;
      return 'Die eingegebenen Passwörter stimmen nicht überein';
    }
    this.passwordsNotEqual = false;
    return null;
  }
}
