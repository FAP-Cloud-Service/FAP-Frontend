import {Component} from '@angular/core';

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

  constructor() {
    if (!this.loggedIn) {
      this.selectedPage = 'login';
    }
  }

  selectPage(value: string): void {
    this.selectedPage = value;
    this.sidenavOpen = false;
  }

}
