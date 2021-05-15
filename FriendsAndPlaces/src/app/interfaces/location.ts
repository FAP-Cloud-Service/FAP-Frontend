export interface Location {
  loginName: string;
  sitzung: string;
  standort: FriendLocation;
}

export interface FriendLocation {
  breitengrad: number;
  laengengrad: number;
}

export interface CoordinatesLocation {
  standort: FriendLocation;
}
