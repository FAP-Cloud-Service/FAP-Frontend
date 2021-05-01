export class Session {
  SessionId: string;
}

export class UserLogin {
  loginName: string;
  passwort: string;
}

export class UserRegister {
  username: string;
  password: string;
}

export class UserLogout {
  loginName: string;
  sitzung: string;
}
