import { Component, OnInit, Input } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading = false;
  heading = 'Neuen Account anlegen...';
  personalForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required)
  });
  addressForm = new FormGroup({
    street: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required),
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
  constructor(public dialogRef: MatDialogRef<RegisterComponent>) { }
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
  }
}
