import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abort-dialog',
  templateUrl: './abort-dialog.component.html',
  styleUrls: ['./abort-dialog.component.scss']
})
export class AbortDialogComponent {

  @Input() message?: string;

  constructor(public abortDialogRef: MatDialogRef<AbortDialogComponent>) { }

  closeParentDialog(): void {
    this.abortDialogRef.close(true);
  }
}
