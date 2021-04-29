import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  @Output() selectedPage = new EventEmitter<string>();
  panelOpenState = false;
  firstname = 'Jan';
  lastname = 'Hümmelink';
  latitude: number;
  longitude: number;
  position: any;
  positionWasCalled = false;
  error: string;
  constructor() { }
  ngOnInit(): void {
  }
  submitLocation(): void {
    console.log('Standort gespeichert');
  }
  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((
        (position) => {
          this.latitude = position.coords.latitude;
          console.log();
          this.longitude = position.coords.longitude;
          this.positionWasCalled = true;
        }
      ));
    }
    else {
      this.error = 'Zugriff auf Standort nicht möglich';
    }
  }
}
