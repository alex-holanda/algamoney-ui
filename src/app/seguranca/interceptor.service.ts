import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { AuthService } from 'src/app/seguranca/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes('/oauth/token')) {
      return next.handle(request);
    }

    if (this.auth.obterToken()) {
      request = this.addToken(request, this.auth.obterToken());
    }

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

  private addToken(request: HttpRequest<any>, token: string) {
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`})
                          .append('Content-Type', 'application/json');

    return request.clone({ headers });
  }
}
