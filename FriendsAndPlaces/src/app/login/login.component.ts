import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {RegisterComponent} from "../register/register.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  constructor(public dialog: MatDialog) { }

  getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'Pflichtfeld';
    }
    return this.email.hasError('email') ? 'E-Mail ungeültig' : '';
  }
  getPasswordErrorMessage(): string {
    if (this.password.hasError('required')) {
      return 'Pflichtfeld';
    }
    return this.password.hasError('minlength') ? 'Passwort zu kurz!' : '';
  }
  openRegisterDialog(): void {
    this.dialog.open(RegisterComponent, {
      disableClose: true,
      hasBackdrop: true,
      minWidth: '80%',
      restoreFocus: true
    });
  }
  ngOnInit(): void {
  }

}
