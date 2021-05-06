import {Component, EventEmitter, OnInit, Output, Input, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';


const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  constructor(  ) {
  }

  @Output() selectedPage = new EventEmitter<string>();

  map: any;
  id: any;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() name: string;


  private initMap(): void {
    console.log('map' + this.id);
    this.map = L.map('map' + this.id, {
      center: [this.latitude, this.longitude],
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    const marker = L.marker([this.latitude, this.longitude]);
    const popUpHtml = `<div>Name: ${this.name}</div>` +
      `<div>Longitude: ${this.longitude}</div>` +
      `<div>Latitude: ${this.latitude}</div>`;
    marker.bindPopup(popUpHtml);
    marker.addTo(this.map);

    if (navigator.userAgent.indexOf('Safari') !== -1){
      // fix only relevant for safari
      this.map.tap.disable();
    }
  }


  ngOnInit(): void {
    this.id = Date.now();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
