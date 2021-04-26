import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {RegisterComponent} from '../register/register.component';
import {LoginService} from '../services/login.service';
import {catchError} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  constructor(public dialog: MatDialog, private loginService: LoginService, private errorSnackBar: MatSnackBar) { }

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
    this.loginService.performLogin(
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value
    ).subscribe(
      () => {
        console.log('Login Erfolgreich');
        this.errorSnackBar.open('Login möglich', '', { duration: 5000 });
      },
      () => {
        this.loading = false;
        this.loginForm.enable();
        this.errorSnackBar.open('Login nicht möglich', '', { duration: 5000 });
      },
    );
  }
  ngOnInit(): void {
  }

}
