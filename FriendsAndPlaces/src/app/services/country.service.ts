import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  countries: any;
  private countryApiUrl = 'https://api.first.org/data/v1/countries/?region=europe';
  constructor(private http: HttpClient) {}
  getAllCountries(): Observable<any> {
    return this.http.get(this.countryApiUrl);
  }
}
