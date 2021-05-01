import {Injectable} from '@angular/core';
import {API} from '../api.conf';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserRegister} from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) {}
  performRegistartion(
    payload: UserRegister
  ): Observable<any> {
    return this.http.post('/api/users/new', payload, this.httpOptions);
  }
}
