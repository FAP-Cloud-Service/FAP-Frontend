import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZipcodeService {
  countries: any;
  private zipCodeApiUrl = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=georef-germany-postleitzahl&q=';
  constructor(private http: HttpClient) {}
  getCityByZipCode(plz: number): Observable<any> {
    return this.http.get(this.zipCodeApiUrl + plz);
  }
}
