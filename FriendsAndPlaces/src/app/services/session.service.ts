import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SessionSettings } from '../interfaces/session';
import { Session } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  cookieName = 'FAP_Session_Settings';

  constructor(private cookieService: CookieService) { }

  getSessionIfValid(username: string): Session {
    if(this.cookieService.check(this.cookieName + '_' + btoa(username))) {
      const sessionSettings = this.getSessionSettings(username);
      if(this.isValidSession(sessionSettings)) {
        return sessionSettings.session;
      }
    }
    return new Session;
  }

  getSessionSettings(username: string): SessionSettings {
    if (this.cookieService.check(this.cookieName + '_' + btoa(username))) {
      const cookieContent = this.cookieService.get(this.cookieName + '_' + btoa(username));
      const sessionSettings: SessionSettings = JSON.parse(cookieContent);
      // Decode sessionId/username in base64
      sessionSettings.session.SessionId = atob(sessionSettings.session.SessionId);
      sessionSettings.username = atob(sessionSettings.username);
      return sessionSettings;
    }
    return new SessionSettings();
  }

  setSession(session: Session, username: string): void {
    const sessionSettings = new SessionSettings();
    sessionSettings.session = session;

    // Encode sessionId/username in base64
    sessionSettings.session.SessionId = btoa(session.SessionId);
    sessionSettings.username = btoa(username);
    sessionSettings.createDate = new Date();

    // Set cookie expiration to 2 hours, the cookie will automatically be deleted after expiration
    let expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 2);

    this.cookieService.set(this.cookieName + '_' + btoa(username), JSON.stringify(sessionSettings) ,expirationDate, undefined, undefined, true);
  }

  deleteSession(username: string): void {
    if (this.cookieService.check(this.cookieName + '_' + btoa(username))) {
      this.cookieService.delete(this.cookieName+ '_' + btoa(username));
    }
  }

  isValidSession(session: SessionSettings): boolean {
    //TODO: Implement when backend has possibility to validate session id
    return true;
  }
}
