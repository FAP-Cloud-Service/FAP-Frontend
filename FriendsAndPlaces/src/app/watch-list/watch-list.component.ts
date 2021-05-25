import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Friend, FriendList } from '../interfaces/friends';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit {

  friendList: FriendList;
  filteredFriendList: Observable<Array<Friend>>;

  selectedFriends: Array<Friend> = new Array<Friend>();

  friendControl = new FormControl();

  loading = true;
  errorOccurred = false;
  breakpoint = false;

  @ViewChild('friendInput') friendInput: ElementRef<HTMLInputElement>;

  constructor(
    private friendsService: FriendsService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 1000);
    this.friendsService.getAllFriends().subscribe(friendList => {
      this.friendList = friendList;

      this.filteredFriendList = this.friendControl.valueChanges.pipe(startWith(''), map(value => this._filterFriends(value)))
      this.loading = false;
    }, err => {
      this.errorOccurred = true;
      console.error('Fehler beim Laden der Freundesliste', err);
      this.snackbar.open('Beim Laden der Freunde ist ein Fehler aufgetreten, bitte versuche es erneut...', '')
    });
  }

  onResize(event: any): void {
    this.breakpoint = (event.target.innerWidth <= 1000);
  }

  selectFriend(selectEvent: MatAutocompleteSelectedEvent): void {
    if (!this.selectedFriends.find(friend => friend.loginName == selectEvent.option.value.loginName)) {
      this.selectedFriends.push(selectEvent.option.value);  
    }
    this.friendInput.nativeElement.value = '';
    this.friendInput.nativeElement.blur();
    this.friendControl.setValue(null);
  }

  remove(removedFriend: Friend): void {
    const index = this.selectedFriends.indexOf(removedFriend);

    if (index >= 0) {
      this.selectedFriends.splice(index, 1);
    }
  }

  private _filterFriends(value: any): Array<Friend> {
    let filterValue = '';
    if (value) {
      console.log(typeof(value) == 'string');
      
      // Only filter if value is string 
      if (typeof(value) == 'string') {
        filterValue = value.toLowerCase();
      }
    }

    return this.friendList.benutzerliste.filter(option => option.loginName.toLowerCase().includes(filterValue))
  }
}
