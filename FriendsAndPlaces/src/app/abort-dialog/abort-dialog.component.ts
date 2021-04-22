import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abort-dialog',
  templateUrl: './abort-dialog.component.html',
  styleUrls: ['./abort-dialog.component.scss']
})
export class AbortDialogComponent implements OnInit {

  @Input() message?: string;

  constructor(public abortDialogRef: MatDialogRef<AbortDialogComponent>) { }

  ngOnInit(): void {
  }
  closeParentDialog(): void {
    this.abortDialogRef.close(true);
  }
}
