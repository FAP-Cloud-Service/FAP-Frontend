import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SessionService} from './session.service';
import { FriendList } from '../interfaces/friends';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  constructor(private sessionService: SessionService, private httpClient: HttpClient) { }
  getAllFriends(): Observable<FriendList> {
    const session = this.sessionService.getSessionIfExistsAndValid();
    return this.httpClient.get<FriendList>('/api/users?login=' + session.username + '&session=' + session.session.sessionId,
      {headers: {Accept: 'application/json'}});
  }
}
