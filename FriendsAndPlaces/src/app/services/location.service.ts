import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import { Location } from "../interfaces/location";
import {SessionService} from "./session.service";
import {Observable} from "rxjs";

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
}
