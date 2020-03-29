import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Observable, Subject } from 'rxjs';
import { GlobalService } from '../global.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public onAuthChange$: Subject<User>;

  constructor(private glService: GlobalService) {
    this.onAuthChange$ = new Subject();
  }

  setUser(user: User) {
    this.onAuthChange$.next(user);

    const userString = JSON.stringify(user);
    localStorage.setItem('currentUser', userString);
  }

  getCurrentUser(): User {

    const userString = localStorage.getItem('currentUser');
    if (!isNullOrUndefined(userString) && userString !== 'undefined') {
      const user: User = JSON.parse(userString);

      return user;
    }
    return null;
  }

  currentUserIsAdmin(): boolean {
    let isAdmin = false;
    this.getCurrentUser().roles.forEach((roleObject: any) => {
      if ((roleObject.role.toLowerCase() === this.glService.ADMINISTRATOR.toLowerCase())
      || (roleObject.role.toLowerCase() === this.glService.ROOT.toLowerCase())) {
        isAdmin = true;
      }
    });
    return isAdmin;
  }

  setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  getToken(): string {
    const token = localStorage.getItem('accessToken');
    if (token && token !== 'undefined') {
      return token;
    }
    return null;
  }

  logout() {

    this.onAuthChange$.next(null);
    // we need also request logout to the server api

    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');

  }

}
