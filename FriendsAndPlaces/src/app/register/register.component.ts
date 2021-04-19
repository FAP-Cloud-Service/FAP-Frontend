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
  personalForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required)
  });
  addressForm = new FormGroup({
    street: new FormControl(),
    zip: new FormControl(),
    city: new FormControl(),
    country: new FormControl()
  });
  contactForm = new FormGroup({
    mobile: new FormControl(),
    email: new FormControl(),
  });
  accountForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    passwordConfirm: new FormControl()
  });
  constructor(public dialogRef: MatDialogRef<RegisterComponent>) { }
  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
}
