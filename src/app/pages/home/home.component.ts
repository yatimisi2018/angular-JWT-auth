import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  now: Date;
  token: string;
  payload: object;
  expirationDate: Date;
  refreshExpirationDate: Date;
  me$: Observable<User>;

  constructor(public authService: AuthService, private jwtHelperService: JwtHelperService, private userService: UserService) { }

  ngOnInit() {
    this.getTokenInfo();
  }

  getTokenInfo() {
    if (!this.authService.isAuthenticated) {
      return;
    }

    this.now = new Date();
    this.token = this.authService.accessToken;
    this.payload = this.jwtHelperService.decodeToken(this.token);

    const refreshToken = this.authService.refreshToken;

    if (this.token === null || refreshToken === null) {
      return;
    }

    this.expirationDate = this.jwtHelperService.getTokenExpirationDate(this.token);
    this.refreshExpirationDate = this.jwtHelperService.getTokenExpirationDate(refreshToken);
  }

  getMe() {
    this.me$ = this.userService.me();
  }
}
