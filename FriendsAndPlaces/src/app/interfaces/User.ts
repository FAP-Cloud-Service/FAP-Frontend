export class Session {
  SessionId: string;
}

export class UserLogin {
  loginName: string;
  passwort: string;
}

export class UserRegister {
  loginName: string;
  passwort: {
    passwort: string
  };
  vorname: string;
  nachname: string;
  strasse: string;
  plz: string;
  ort: string;
  land: string;
  telefon: string;
  email: {
    adresse: string
  };
  constructor(loginName: string, passwort: { passwort: string }, vorname: string, nachname: string, strasse: string, plz: string, ort: string, land: string, telefon: string, email: { adresse: string }) {
    this.loginName = loginName;
    this.passwort = passwort;
    this.vorname = vorname;
    this.nachname = nachname;
    this.strasse = strasse;
    this.plz = plz;
    this.ort = ort;
    this.land = land;
    this.telefon = telefon;
    this.email = email;
  }
}
