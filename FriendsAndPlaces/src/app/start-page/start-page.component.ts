import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SessionService} from '../services/session.service';
import {RegisterComponent} from '../register/register.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent{
  registerDialogOpen = false;
  @Output() selectedPage = new EventEmitter<string>();

  @Input() loggedIn: boolean;

  constructor(public dialog: MatDialog) { }
  goToLoginPage(): void {
    this.selectedPage.emit('login');
  }
  openRegisterDialog(): void {
    this.registerDialogOpen = true;
    this.dialog.open(RegisterComponent, {
      disableClose: true,
      backdropClass: 'blur-backdrop',
      hasBackdrop: true,
      minWidth: '40%',
      restoreFocus: true
    }).afterClosed().subscribe(
      (data) => {
        this.registerDialogOpen = false;
      }
    );
  }
}
