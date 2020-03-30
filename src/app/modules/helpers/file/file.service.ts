import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { File } from './file';
import { GlobalService } from 'src/app/global.service';
import { AuthentificationService } from '../services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private authentifictionService: AuthentificationService,
    private glService: GlobalService) {
  }

  getFileUrl(name): string {
    if (name) {
      return this.glService.DOWNLOAD_FILE + '/' + name;
    }
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  delete(id): Observable<any> {
    this.headers.set('Content-Type', 'application/json');

    const url = this.glService.FILE + '/' + this.authentifictionService.getCurrentUser().id + '/images/' + id;
    return this.http.delete(url);
  }

  upload(file): Observable<File> {
    const url = this.glService.FILE + '/' + this.authentifictionService.getCurrentUser().id + this.glService.UPLOAD_FILE;
    const data = new FormData();
    data.append('file', file);

    return this.http.post(url, data);
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      // byteString = unescape(dataURI.split(',')[1]);
      byteString = atob(dataURI.split(',')[1]);
    }

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  validateFile(file): boolean {
    const fileAcceptTypes: string[] = ['image/png', 'image/jpg', 'image/jpeg'];
    const fileSizeMaximum = 52428800;
    const fileType = file.type;
    const fileSize = file.size;

    for (const ftype of fileAcceptTypes) {
      if (ftype === fileType && fileSize <= fileSizeMaximum) {
        return true;
      }
    }
    return false;
  }

}
