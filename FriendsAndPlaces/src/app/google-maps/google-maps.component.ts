import {Component, Input, OnInit} from '@angular/core';
import { FriendMapLocation } from '../interfaces/location';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() username: string;
  @Input() friendArray?: any[];
  constructor() { }

  ngOnInit(): void {
  }
}
