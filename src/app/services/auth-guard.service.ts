import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuardService implements CanLoad {

    constructor(private authService: AuthentificationService, private router: Router) { }
    /* route: ActivatedRouteSnapshot, state: RouterStateSnapshot */
    canLoad(route: Route):boolean {
        if (this.authService.getCurrentUser() && this.authService.getCurrentUser() !== null ) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        /* this.router.navigate(['/login'], { queryParams: { returnUrl: this.state.url } }); */
        this.router.navigate(['/login'], { queryParams: { returnUrl: ''} });
        return false;
    }
}
