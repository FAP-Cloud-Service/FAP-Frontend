export interface Session {
  sessionId: string;
}

export interface UserLogin {
  loginName: string;
  passwort: {
    passwort: string;
  };
}

export interface UserRegister {
  username: string;
  password: string;
}
