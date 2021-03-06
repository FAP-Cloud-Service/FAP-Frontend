import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CoordinatesLocation, FriendLocation, Location} from '../interfaces/location';
import {SessionService} from './session.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }
  submitLocation(latitude: number, longitude: number): Observable<any> {
    const session = this.sessionService.getSessionIfExistsAndValid();
    const payload: Location = {
      loginName: session.username,
      sitzung: session.session.sessionId,
      standort: {
        breitengrad: latitude,
        laengengrad: longitude
      }
    };
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.httpClient.put('/api/setlocation', payload, httpOptions);
  }
  getLocationByUser(username: string): Observable<FriendLocation> {
    const session = this.sessionService.getSessionIfExistsAndValid();
    const loggedInUsername = session.username;
    const sessionId = session.session.sessionId;
    const httpOptions = {
      headers: new HttpHeaders({ Accept: 'application/json' })
    };
    return this.httpClient.get<FriendLocation>('/api/location?login=' + loggedInUsername + '&session=' + sessionId + '&id=' + username, httpOptions);
  }
  getCoordinatesByAddress(country: string, zip: string, city: string, street: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ Accept: 'application/json' })
    };
    return this.httpClient.get('/api/coordinates?land=' + country + '&plz=' + zip + '&ort=' + city + '&strasse=' + street, httpOptions);
  }
}
