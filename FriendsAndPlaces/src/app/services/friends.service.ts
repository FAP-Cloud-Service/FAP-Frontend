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
    return this.httpClient.get('/api/users?login=' + session.username + '&session=' + session.session.sessionId,
      {headers: {Accept: 'application/json'}});
  }
}
