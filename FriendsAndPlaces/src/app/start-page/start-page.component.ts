import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent {

  @Output() selectedPage = new EventEmitter<string>();

  constructor() { }

  goToLoginPage() {
    this.selectedPage.emit('login');
  }

}
