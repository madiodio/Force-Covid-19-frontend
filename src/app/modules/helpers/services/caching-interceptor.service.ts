import { Injectable, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { RequestCacheService } from './request-cache.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CachingInterceptorService implements HttpInterceptor {
  platformId: Object;

  constructor(private cache: RequestCacheService, private injector: Injector, @Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
   }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cachedResponse = this.cache.get(req);
    return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next, this.cache);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCacheService): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        /* 'Accept': 'application/json' */
      }
    });

    if (isPlatformBrowser(this.platformId)) {//<== means you are client side
    if (localStorage.getItem('currentUser') && localStorage.getItem('accessToken')) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
    }
  }

    return next.handle(req).pipe(
      tap(event => {
        if (req.method === 'GET' && event instanceof HttpResponse) {
          cache.put(req, event);
        }
      }), catchError(error => {
        const router = this.injector.get(Router);
        if ('/user/login' !== router.url && error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
          router.navigate(['/user/login']);
        } else {
          return throwError(error);
        }
      }));
  }
}

