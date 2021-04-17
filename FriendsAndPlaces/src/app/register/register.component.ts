import { Component, OnInit, Input } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email = new FormControl();
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(public dialogRef: MatDialogRef<RegisterComponent>) { }
  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
