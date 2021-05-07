import {Component, EventEmitter, OnInit, Output, Input, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import { detect } from 'detect-browser';
import {MapService} from '../services/map.service';


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

  constructor( private mapService: MapService ) {
  }

  @Output() selectedPage = new EventEmitter<string>();

  map: any;
  id: any;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() name: string;


  private initMap(): void {
    console.log('map' + this.id);
    this.map = this.mapService.getMap('map' + this.id, this.latitude, this.longitude, 15);

    const marker = L.marker([this.latitude, this.longitude]);
    const popUpHtml = `<div>Name: ${this.name}</div>` +
      `<div>Longitude: ${this.longitude}</div>` +
      `<div>Latitude: ${this.latitude}</div>`;
    marker.bindPopup(popUpHtml);
    marker.addTo(this.map);
    const markers = [marker];
    const group = L.featureGroup(markers);

    this.map.on('load', (() => { setTimeout(() => {
      this.map.invalidateSize();
    }, 1); }));
    this.map.setView([this.latitude, this.longitude], 15);

  }


  ngOnInit(): void {
    this.id = Date.now();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
