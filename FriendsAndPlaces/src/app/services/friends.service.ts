import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SessionService} from './session.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  constructor(private sessionService: SessionService, private httpClient: HttpClient) { }
  getAllFriends(): Observable<any> {
    const session = this.sessionService.getSessionIfExistsAndValid();
    console.log(session.session.SessionId);
    return this.httpClient.get('/api/users?session=' + session,
      {headers: {Accept: 'application/json'}});
  }
}
