import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FriendsService} from '../services/friends.service';
import {Friend, FriendList} from '../interfaces/friends';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {SaveLocationComponent} from '../save-location/save-location.component';
import { DisplayNamePipe } from '../pipes/display-name.pipe';

@Component({
  selector: 'app-freunde',
  templateUrl: './freunde.component.html',
  styleUrls: ['./freunde.component.scss']
})

export class FreundeComponent implements OnInit {
  @Output() selectedPage = new EventEmitter<string>();
  friendList: Array<Friend>;
  loading = true;
  errorOccurred = false;
  breakpoint = false;
  constructor(
    private friendsService: FriendsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private displayNamePipe: DisplayNamePipe) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 1000);
    this.getFriends();
  }

  onResize(event: any): void {
    this.breakpoint = (event.target.innerWidth <= 1000);
  }
  getFriends(): void {
    this.loading = true;
    this.errorOccurred = false;
    this.friendsService.getAllFriends().subscribe(
      (response: FriendList) => {
        response.benutzerliste.forEach(user => {
          user.displayname = this.displayNamePipe.transform(user);
        });
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
    this.dialog.open(SaveLocationComponent, { width: '100%', minHeight: '70%' });
  }
}
