import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FriendsService} from '../services/friends.service';
import {Friend, FriendList} from '../interfaces/friends';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {SaveLocationComponent} from '../save-location/save-location.component';

@Component({
  selector: 'app-freunde',
  templateUrl: './freunde.component.html',
  styleUrls: ['./freunde.component.scss']
})

export class FreundeComponent implements OnInit {
  @Output() selectedPage = new EventEmitter<string>();
  friendList: [Friend];
  loading = true;
  errorOccurred = false;
  constructor(private friendsService: FriendsService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getFriends();
    console.log(this.friendList);
  }
  getFriends(): void {
    this.loading = true;
    this.errorOccurred = false;
    this.friendsService.getAllFriends().subscribe(
      (response: FriendList) => {
        this.friendList = response.benutzerliste;
        this.loading = false;
      },
      () => {
        this.snackBar.open('Beim laden deiner Freunde ist ein Fehler aufgetreten...', '', { duration: 5000 });
        this.loading = false;
        this.errorOccurred = true;
      }
    );
  }
  openLocationDialog(): void {
    this.dialog.open(SaveLocationComponent);
  }
}
