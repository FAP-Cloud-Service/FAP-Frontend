import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Session, UserLogin, UserLogout, UserRegister} from '../interfaces/User';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) {}
  performRegistration(
    payload: UserRegister
  ): Observable<any> {
    return this.http.post('/api/users/new', payload, this.httpOptions);
  }
  performLogin(username: string, password: string): Observable<any> {
    const payload: UserLogin = {
      loginName: username,
      passwort: password
    };

    return this.http.post<Session>('/api/login', payload, {
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    });
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  performLogout(username: string, session: Session): Observable<any> {
    const payload: UserLogout = {
      loginName: username,
      sitzung: session.SessionId
    };
    return this.http.post('/api/logout', payload, {
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'}
    });
  }
  checkUsernameAvailability(username: string): Observable<any> {
    return this.http.get('/api/users/available?id=' + username);
  }
}
