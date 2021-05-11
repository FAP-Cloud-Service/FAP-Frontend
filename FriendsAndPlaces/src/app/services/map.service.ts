import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import {detect} from 'detect-browser';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  getMap(element: string, latitude: number, longitude: number, zoom: number): L.Map {

    const googleSatellite = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}&region=DE', {
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      maxZoom: 20,
      attribution: '&copy; <a href="http://www.maps.google.com">Google Maps</a>'
    });

    const googleStreets = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&region=DE', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; <a href="http://www.maps.google.com">Google Maps</a>'
    });

    const googleHybrid = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}&region=DE', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; <a href="http://www.maps.google.com">Google Maps</a>'
    });

    const googleTerrain = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}&region=DE', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; <a href="http://www.maps.google.com">Google Maps</a>'

    });

    const googleTraffic = L.tileLayer('https://{s}.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}&region=DE', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; <a href="http://www.maps.google.com">Google Maps</a>'
    });

    const map = L.map(element, {
      zoom,
      center: [latitude, longitude],
      layers: [googleStreets]
    });
    const baseMaps = {
      Satellit: googleSatellite,
      Straße: googleStreets,
      Hybrid: googleHybrid,
      Terrain: googleTerrain,
      Verkehr: googleTraffic
    };
    L.control.layers(baseMaps).addTo(map);
    if (detect()?.name === 'safari') {
      map.tap?.disable();
    }
    return map;
  }
}
