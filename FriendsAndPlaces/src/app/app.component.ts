import { Component } from '@angular/core';
import { Session } from 'selenium-webdriver';
import { SessionService } from './services/session.service';

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

  currentSession: Session;

  constructor(private sessionService: SessionService) {
    console.log('Checking for existing session...');

    const session = this.sessionService.getSessionIfExistsAndValid()
    if (session.SessionId && session.SessionId != '') {
      this.loggedIn = true;
      console.log('Found existing session');
    } else {
      console.log('No existing session found');
    }

    if (!this.loggedIn) {
      this.selectedPage = 'login';
    }
  }

  selectPage(value: string): void {
    this.selectedPage = value;
    this.sidenavOpen = false;
  }

  logInOut() {
    alert('Implement me')
  }

}
