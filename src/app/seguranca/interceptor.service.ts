import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from 'src/app/seguranca/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes('/oauth/token')) {
      return next.handle(request);
    }

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({Authorization: `Bearer ${token}`})
                          .append('Content-Type', 'application/json');

    request = request.clone({ headers });

    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401 && error.error.error_description.includes('Access token expired')) {
          return this.auth.obterNovoAccessToken().pipe(
            mergeMap((newToken: string) => {
              console.log('novo access_token');
              const h = new HttpHeaders({Authorization: `Bearer ${newToken}`})
                .append('Content-Type', 'application/json');
              request = request.clone({ headers: h });
              return next.handle(request);
            }),
          );
        }
        return throwError(error);
      })
    );
  }
}