import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss']
})
export class SidenavContentComponent {

  @Output() selectedPage = new EventEmitter<string>();

  @Input() loggedIn: boolean;

  @Input() selectPage: string;

  constructor() {  }

  selectedPageChanged(value: string): void {
    this.selectedPage.emit(value);
  }

}
