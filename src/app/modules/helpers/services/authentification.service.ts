import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { GlobalService } from 'src/app/global.service';
import { isNullOrUndefined } from 'util';
import { isPlatformBrowser } from '@angular/common';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public onAuthChange$: Subject<User>;
  platformId: Object;

  constructor(private glService: GlobalService, @Inject(PLATFORM_ID) platformId: Object) {
    this.onAuthChange$ = new Subject();
    this.platformId = platformId;
  }

  setUser(user: User) {
    if (isPlatformBrowser(this.platformId)) {//<== means you are client side
      this.onAuthChange$.next(user);

      const userString = JSON.stringify(user);
      localStorage.setItem('currentUser', userString);
    }
  }

  getCurrentUser(): User {
    if (isPlatformBrowser(this.platformId)) {//<== means you are client side
      const userString = localStorage.getItem('currentUser');
      if (!isNullOrUndefined(userString) && userString !== 'undefined') {
        const user: User = JSON.parse(userString);

        return user;
      }
    }
    return null;
  }

  currentUserIsAdmin(): boolean {
    let isAdmin = false;
    if (isPlatformBrowser(this.platformId)) {//<== means you are client side
      if (this.getCurrentUser()) {
        this.getCurrentUser().roles.forEach((roleObject: any) => {
          if ((roleObject.role.toLowerCase() === this.glService.ADMINISTRATOR.toLowerCase())
            || (roleObject.role.toLowerCase() === this.glService.ROOT.toLowerCase())) {
            isAdmin = true;
          }
        });
      }
    }
    return isAdmin;
  }

  setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {//<== means you are client side
      localStorage.setItem('accessToken', token);
    }
  }

  getToken(): string {
    if (isPlatformBrowser(this.platformId)) {//<== means you are client side
      const token = localStorage.getItem('accessToken');
      if (token && token !== 'undefined') {
        return token;
      }

    }
    return null;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {//<== means you are client side
      this.onAuthChange$.next(null);
      // we need also request logout to the server api

      localStorage.removeItem('currentUser');
      localStorage.removeItem('accessToken');
    }
  }
}
