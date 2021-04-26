import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {RegisterComponent} from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern(/^[\S]+$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  constructor(public dialog: MatDialog) { }

  getUsernameErrorMessage(): string {
    if (this.loginForm.controls.username.hasError('required')) {
      return 'Pflichtfeld';
    }
    return this.loginForm.controls.username.hasError('pattern') ? 'Der Benutzername enthällt Leerzeichen' : '';
  }
  getPasswordErrorMessage(): string {
    if (this.loginForm.controls.password.hasError('required')) {
      return 'Pflichtfeld';
    }
    return this.loginForm.controls.password.hasError('minlength') ? 'Passwort zu kurz!' : '';
  }
  openRegisterDialog(): void {
    this.dialog.open(RegisterComponent, {
      disableClose: true,
      hasBackdrop: true,
      minWidth: '40%',
      restoreFocus: true
    });
  }
  performLogin(): void {
    this.loading = true;
    this.loginForm.disable();
  }
  ngOnInit(): void {
  }

}
