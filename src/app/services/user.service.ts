import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AuthentificationService } from './authentification.service';
import { GlobalService } from '../global.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.authentifictionService.getToken(),
  });

  updateHeaders() {
    const currentUser: any = this.authentifictionService.getCurrentUser();
    if (!currentUser) {
      this.headers.delete('Authorization');
    } else {
      const sessionToken: any = this.authentifictionService.getToken();
      this.headers.set('Authorization', sessionToken);
    }
  }
  constructor(private http: HttpClient, private authentifictionService: AuthentificationService, private glService: GlobalService) {
    console.log('UsersService initialized ...');
  }

  register(user: User): Observable<any> {
    this.headers.delete('Authorization');
    return this.http.post(this.glService.USERS_URL, user, { headers: this.headers });
  }

  updateUser(user: User): Observable<any> {
    const url = this.glService.USERS_URL + user.id;
    return this.http.put(url, user, { headers: this.headers });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.glService.USER_LOGIN_URL, { username: email, password: password });
   /*
    return this.http.post<any>(this.glService.USER_LOGIN_URL, { email: email, password: password }, { headers: this.headers }).pipe(
      map(response => response.json())
    );
    */
  }

  logout(): Observable<any> {
    const data = { accessTokenID: this.authentifictionService.getToken() };
    return this.http.post(this.glService.USER_LOGOUT_URL, data, { headers: this.headers });
  }

}
