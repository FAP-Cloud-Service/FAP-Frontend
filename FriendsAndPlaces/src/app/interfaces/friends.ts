export interface FriendList {
  benutzerliste: Array<Friend>;
}

export interface Friend {
  loginName: string;
  vorname: string;
  nachname: string;
  displayname: string;
}

export interface FriendMarker {
  name: string;
  latitude: number;
  longitude: number;
}
