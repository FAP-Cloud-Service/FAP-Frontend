import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-verification',
  templateUrl: './logout-verification.component.html',
  styleUrls: ['./logout-verification.component.scss']
})
export class LogoutVerificationComponent {

  constructor(public dialogRef: MatDialogRef<LogoutVerificationComponent>) { }

  closeDialog(logout: boolean): void {
    this.dialogRef.close(logout);
  }
}
