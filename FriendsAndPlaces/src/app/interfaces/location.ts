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

export interface FriendMapLocation {
  name: string;
  latitude: number;
  longitude: number;
}

export interface Address {
  street: string;
  zip: string;
  city: string;
  country: string;
}
