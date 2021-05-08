export interface FriendList {
  benutzerliste: [Friend];
}

export interface Friend {
  loginName: string;
  vorname: string;
  nachname: string;
  displayname: string
}
