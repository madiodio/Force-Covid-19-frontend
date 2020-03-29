import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  BASE_API_URL = `${environment.apiUrl}`;

  ADMINISTRATOR = 'administrator';
  ROOT = 'ROOT';
  USERS_URL = this.BASE_API_URL + '/users';
  USER_REGISTER_URL = this.BASE_API_URL + '/auth/register';
  USER_LOGIN_URL = this.BASE_API_URL + '/auth/login';
  USER_LOGOUT_URL = this.BASE_API_URL + '/users/logout';

  UPLOAD_FILE = '/upload/images';
  DOWNLOAD_FILE = this.BASE_API_URL + '/files/download/images';
  FILE = this.BASE_API_URL + '/files';
  
  constructor() { }
}
