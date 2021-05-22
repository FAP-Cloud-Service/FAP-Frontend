import {Component, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {GoogleMapsAPIWrapper, AgmMap, LatLngBoundsLiteral, LatLngBounds} from '@agm/core';
import {AgmInfoWindow, MapsAPILoader} from '@agm/core';
declare const google: any;

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit, AfterViewInit {
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() username: string;
  @Input() friendArray?: any[];
  public bounds: any;

  constructor(public mapsAPILoader: MapsAPILoader) { }
  @ViewChild('AgmMap') agmMap: AgmMap;

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    if (this.friendArray !== undefined) {
      this.mapsAPILoader.load().then(() => {
        this.bounds = new google.maps.LatLngBounds();
        // @ts-ignore
        for (const item of this.friendArray){
          this.bounds.extend(new google.maps.LatLng(item.latitude, item.longitude));
        }
      });
    }
  }
}
