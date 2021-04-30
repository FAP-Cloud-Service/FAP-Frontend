import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { API } from '../api.conf';
import {Observable, of} from 'rxjs';
import {Session, UserLogin} from '../interfaces/User';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_URL = API.url + 'login/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {}
  performLogin(username: string, password: string): Observable<any> {
    const payload: UserLogin = {
      loginName: username,
      passwort: {
        passwort: password
      }
    };
    return this.http.post<Session>(this.API_URL, payload, this.httpOptions);
  }
  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
