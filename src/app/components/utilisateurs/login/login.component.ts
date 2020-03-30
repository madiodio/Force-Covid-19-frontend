import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from 'src/app/models/user';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { GlobalService } from 'src/app/global.service';

declare const $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  message = '';
  user: User = new User();
  loading = false;
  returnUrl: string;

  constructor(
    private userService: UserService,
    private authService: AuthentificationService,
    private activeroute: ActivatedRoute,
    private router: Router, private glService: GlobalService) { }

  ngOnInit() {
    this.returnUrl = this.activeroute.snapshot.queryParams['returnUrl'] || '/administration';
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      if (this.authService.currentUserIsAdmin()) {
        this.router.navigate(['/administration']);
      } else {
        this.router.navigate(['/user']);
      }
    } else {
      this.user = new User();
    }

  }


  onLogin() {
    this.loading = true;
    // we have user login data. now post to the api server. to verify account. and get the access token key.

    // generate new service.

    const user = this.user;

    this.userService.login(user.email, user.password).subscribe(response => {
      // now we need save user token to the cookie. or now i just simply save to Local storage.
      const getteduser = response.user as User;
      getteduser.type = getteduser.roles[0] ? getteduser.roles[0].role : 'user';
      this.authService.setUser(getteduser);

      const token = response.id;

      this.authService.setToken(token);
      if (getteduser.type && getteduser.type === this.glService.ADMINISTRATOR) {
        // now we need redirect to profile user if they logged in.
        this.router.navigate([this.returnUrl]);
      } else {
        // now we need redirect to profile user if they logged in.
        this.router.navigate(['/user']);
      }

    }, err => {
      this.loading = false;
      this.message = 'Email ou mot de passe incorrect!';
      console.log(err);
    });

  }
}
