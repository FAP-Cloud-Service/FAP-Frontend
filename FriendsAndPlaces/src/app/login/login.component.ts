import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
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
  constructor() { }
  ngOnInit(): void {
  }

}
