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
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordRepeat: new FormControl('', Validators.required)
  });
  constructor(public dialogRef: MatDialogRef<RegisterComponent>) { }
  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
  getEmailErrorMessage(): string {
    if (this.registerForm.controls.email.hasError('required')) {
      console.log('Pflichtfeld');
      return 'Pflichtfeld';
    }
    console.log('Mail ungeülgitg');
    return this.registerForm.controls.email.hasError('email') ? 'E-Mail ungeültig' : '';
  }
  onSubmit(): void {
    this.loading = true;
    this.registerForm.disable();
  }
}
