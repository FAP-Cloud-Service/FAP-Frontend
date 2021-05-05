export interface Location {
  loginName: string;
  sitzung: string;
  standort: {
    laengengrad: number;
    breitengrad: number;
  };
}

export interface FriendLocation {
  breitengrad: number;
  laengengrad: number;
}
