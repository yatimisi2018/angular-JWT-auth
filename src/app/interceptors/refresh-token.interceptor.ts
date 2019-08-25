import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { catchError, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  refreshURL = `${environment.serverURL}/token/refresh`;

  constructor(
    private authService: AuthService,
    private jwtInterceptor: JwtInterceptor,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.jwtInterceptor.isWhitelistedDomain(request) || this.jwtInterceptor.isBlacklistedRoute(request)) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        const errorResponse = error as HttpErrorResponse;

        if (errorResponse.status === 401 && request.url !== this.refreshURL) {
          return this.authService.refresh().pipe(mergeMap(
            () => {
              return this.jwtInterceptor.intercept(request, next);
            }
          ));
        }

        this.router.navigate(['/login']);
        this.authService.logout();
        return throwError(error);
      })
    );
  }
}
