import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SessionSettings } from '../interfaces/session';
import { Session } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private cookieService: CookieService) { }

  cookieName = 'FAP_Session_Settings';

  private static isValidSession(session: SessionSettings): boolean {
    // TODO: Implement when backend has possibility to validate session id
    return true;
  }

  getSessionIfExistsAndValid(): SessionSettings {
    if (this.cookieService.check(this.cookieName)) {
      const sessionSettings = this.getSession();
      if (SessionService.isValidSession(sessionSettings)) {
        return sessionSettings;
      }
    }
    return new SessionSettings();
  }

  getSession(): SessionSettings {
    if (this.cookieService.check(this.cookieName)) {
      const cookieContent = this.cookieService.get(this.cookieName);
      const sessionSettings: SessionSettings = JSON.parse(cookieContent);
      // Decode sessionId/username in base64
      sessionSettings.session.sessionId = atob(sessionSettings.session.sessionId);
      sessionSettings.username = atob(sessionSettings.username);
      return sessionSettings;
    }
    return new SessionSettings();
  }

  setSession(session: Session, username: string): void {
    const sessionSettings = new SessionSettings();
    sessionSettings.session = session;

    // Encode sessionId/username in base64
    sessionSettings.session.sessionId = btoa(session.sessionId);
    sessionSettings.username = btoa(username);
    sessionSettings.createDate = new Date();

    // Set cookie expiration to 2 hours, the cookie will automatically be deleted after expiration
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 2);

    this.cookieService.set(this.cookieName, JSON.stringify(sessionSettings), expirationDate, undefined, undefined, true);
  }

  deleteSession(): void {
    if (this.cookieService.check(this.cookieName)) {
      this.cookieService.delete(this.cookieName);
    }
  }
}
