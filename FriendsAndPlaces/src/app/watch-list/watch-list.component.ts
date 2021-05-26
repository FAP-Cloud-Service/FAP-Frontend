import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Friend, FriendList, FriendMarker } from '../interfaces/friends';
import { FriendsService } from '../services/friends.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit {

  friendList: FriendList;
  filteredFriendList: Observable<Array<Friend>>;

  selectedFriends: Array<Friend> = new Array<Friend>();
  markersForSelectedFriends: Array<FriendMarker> = new Array<FriendMarker>();

  friendControl = new FormControl();

  loading = true;
  errorOccurred = false;
  breakpoint = false;
  friendArrayChangeCounter: number = 0;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('friendInput') friendInput: ElementRef<HTMLInputElement>;
  @ViewChild('userAutocomplete') matAutocomplete: MatAutocomplete;

  constructor(
    private friendsService: FriendsService,
    private locationService: LocationService,
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
      this.locationService.getLocationByUser(selectEvent.option.value.loginName).subscribe(location => {
        if (location) {
          const marker: FriendMarker = {
            name: selectEvent.option.value.loginName,
            latitude: location.breitengrad,
            longitude: location.laengengrad
          }
          this.markersForSelectedFriends.push(marker);
          this.selectedFriends.push(selectEvent.option.value);
          this.friendArrayChangeCounter++;
        } else {
          this.snackbar.open('Dein Freund "' + selectEvent.option.value.loginName + '" hat noch keinen Standort hinterlegt.', '', {duration: 5000})
        }
      });
    }
    this.friendInput.nativeElement.value = '';
    this.friendInput.nativeElement.blur();
    this.friendControl.setValue(null);
  }

  remove(removedFriend: Friend): void {
    const index = this.selectedFriends.indexOf(removedFriend);

    if (index >= 0) {
      // Use same Index since the index is the same for both arrays
      this.markersForSelectedFriends.splice(index, 1);

      this.selectedFriends.splice(index, 1);
      this.friendArrayChangeCounter++;
    }
  }

  friendISSelected(friend: Friend): boolean {
    return this.selectedFriends.includes(friend);
  }

  private _filterFriends(value: any): Array<Friend> {
    let filterValue = '';
    if (value) {      
      // Only filter if value is string -> user typed in something
      if (typeof(value) == 'string') {
        filterValue = value.toLowerCase();
      }
    }

    return this.friendList.benutzerliste.filter(option => option.loginName.toLowerCase().includes(filterValue))
  }
}
