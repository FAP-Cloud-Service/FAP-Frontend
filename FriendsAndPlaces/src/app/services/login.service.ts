import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  performLogin(username: string, password: string): void {
    const payload = {
      username,
      password
    };
    console.log('Performing Login with: ' + JSON.stringify(payload, null, 2));
  }
}
