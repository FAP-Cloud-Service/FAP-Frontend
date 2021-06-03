import {Component, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {GoogleMapsAPIWrapper, AgmMap, LatLngBoundsLiteral, LatLngBounds} from '@agm/core';
import {AgmInfoWindow, MapsAPILoader} from '@agm/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
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
  @Input()
  public set friendsArrayChanged(val: number) {
    if (this.friendArray && this.friendArray.length > 0) {
      this.updateBounds();
    }
  }

  public bounds: any;
  public zoomControlOptions: any;
  map: any;

  constructor(public mapsAPILoader: MapsAPILoader) { }
  @ViewChild('AgmMap') agmMap: AgmMap;

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    if (this.friendArray !== undefined) {
      this.mapsAPILoader.load().then(() => {
        this.bounds = new google.maps.LatLngBounds();
        this.zoomControlOptions = {
          position: google.maps.ControlPosition.RIGHT_TOP,
        };
        // @ts-ignore
        for (const item of this.friendArray){
          this.bounds.extend(new google.maps.LatLng(item.latitude, item.longitude));
        }

        this.agmMap.mapReady.subscribe(map => {
          this.map = map;
        });
      });
    }
  }

  updateBounds() {
    if (this.friendArray) {
      this.bounds = new google.maps.LatLngBounds();
      // @ts-ignore
      for (const item of this.friendArray){
        this.bounds.extend(new google.maps.LatLng(item.latitude, item.longitude));
      }

      // this.map.fitBounds(this.bounds);
    }
  }
}
