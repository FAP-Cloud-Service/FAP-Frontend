import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FriendsService} from '../services/friends.service';

@Component({
  selector: 'app-freunde',
  templateUrl: './freunde.component.html',
  styleUrls: ['./freunde.component.scss']
})
export class FreundeComponent implements OnInit {
  @Output() selectedPage = new EventEmitter<string>();
  constructor(private friendsService: FriendsService) { }

  ngOnInit(): void {
  }
  getFriends(): void {
    this.friendsService.getAllFriends().subscribe(
      response => console.log(response)
    );
  }
}
