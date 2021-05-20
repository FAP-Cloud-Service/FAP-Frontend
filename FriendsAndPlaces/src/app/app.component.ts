import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionSettings } from './interfaces/session';
import { LogoutVerificationComponent } from './logout-verification/logout-verification.component';
import { SessionService } from './services/session.service';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Friends And Places';

  sidenavOpen = false;
  selectedPage = 'start';

  loggedIn = false;
  currentSession: SessionSettings;

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    const sess = this.sessionService.getSessionIfExistsAndValid();
    if (sess.session && sess.session.sessionId !== '') {
      this.loggedIn = true;
      this.currentSession = sess;
    }

    if (!this.loggedIn) {
      this.selectedPage = 'login';
    }
  }

  selectPage(value: string, loginAgain: boolean = false): void {
    this.selectedPage = value;
    if (this.selectedPage == 'login' && loginAgain) {
      this.loggedIn = false;
      this.sessionService.deleteSession();
    }
    this.sidenavOpen = false;
  }

  sessionChanged(): void {
    this.currentSession = this.sessionService.getSession();
    this.loggedIn = true;
    this.selectPage('start');
  }

  logInOut(): void {
    if (!this.loggedIn) {
      this.selectPage('login');
    } else {
      this.logout();
    }
  }

  private logout() {
    const logoutDialogRef = this.dialog.open(LogoutVerificationComponent);
    logoutDialogRef.afterClosed().subscribe((logout: boolean) => {
      if (logout) {
        // TODO: Add logout operation with loginService
        this.userService.performLogout(this.currentSession.username, this.currentSession.session).subscribe(() => {
          this.sessionService.deleteSession();
          this.loggedIn = false;
          this.snackBar.open('Sie wurden erfolgreich abgemeldet!', '', {
            duration: 5000
          });
          this.currentSession = new SessionSettings();
          this.selectPage('start');
        }, err => {
          console.error('Fehler beim Logout:', err);
          this.snackBar.open('Fehler beim Logout', '', {duration: 5000});
        });
      }
    });
  }

}
