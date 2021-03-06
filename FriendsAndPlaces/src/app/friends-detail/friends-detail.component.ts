import { Component, OnInit, Input } from '@angular/core';
import {LocationService} from '../services/location.service';
import {FriendLocation} from '../interfaces/location';

@Component({
  selector: 'app-friends-detail',
  templateUrl: './friends-detail.component.html',
  styleUrls: ['./friends-detail.component.scss']
})
export class FriendsDetailComponent implements OnInit {
  @Input() username: string;
  @Input() displayname: string;
  latitude: number;
  longitude: number;
  querySuccessful: boolean;
  errorMessage: string;
  loading = true;
  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.locationService.getLocationByUser(this.username).subscribe(
      (response: FriendLocation) => {
        console.log(response);
        if (response) {
          this.latitude = response.breitengrad;
          this.longitude = response.laengengrad;
          this.querySuccessful = true;
        } else {
          this.querySuccessful = false;
        }
        this.loading = false;
      }
    );
  }

}
