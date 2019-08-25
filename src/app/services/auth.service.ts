import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { User } from '../models/user.model';
import { Token } from '../models/token.model';
import { UserService } from './user.service';
import { LocalStorageKeys } from '../enums/local-storage-keys.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(
    private http: HttpService,
    private userService: UserService,
  ) {
    this.loadUser();
  }

  login(data: User): Observable<boolean> {
    return this.http.post<Token>('/token', data).pipe(map(
      (token: Token) => {
        this.setToken(token);

        this.userService.me().subscribe(
          (user: User) => {
            localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(user));
            this.loadUser();
          }
        );

        return this.isAuthenticated;
      }
    ));
  }

  logout(): void {
    localStorage.clear();
  }

  loadUser(): void {
    const user = localStorage.getItem(LocalStorageKeys.USER);

    if (user !== null) {
      this.user = Object.assign(new User(), JSON.parse(user));
    }
  }

  setToken(token: Token): void {
    localStorage.setItem(LocalStorageKeys.ACCESS_TOKE, token.access);
    localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN, token.refresh);
  }

  refresh(): Observable<Token> {
    return this.http.post<Token>('/token/refresh', {refresh: this.refreshToken}).pipe(map(
      (token: Token) => {
        this.setToken(token);
        return token;
      }
    ));
  }

  get isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  get accessToken(): string {
    return localStorage.getItem(LocalStorageKeys.ACCESS_TOKE);
  }

  get refreshToken(): string {
    return localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN);
  }
}
