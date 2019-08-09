import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable, throwError } from 'rxjs';
import { catchError, map, share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string;

  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.carregarToken();
   }

  login(usuario: string, senha: string): Observable<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(`${this.oauthTokenUrl}`, body,
      {headers, withCredentials: true})
      .pipe(
        catchError(this.handleError),
        map(resp => {
          this.armazenarToken(resp.access_token);
        })
      );
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  obterToken() {
    return localStorage.getItem('token');
  }

  obterNovoAccessToken(): Observable<string> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `grant_type=refresh_token`;

    return this.http.post(`${this.oauthTokenUrl}`, body,
      { headers, withCredentials: true })
      .pipe(
        share(),
        catchError(this.handleError),
        map(resp => {
          this.armazenarToken(resp.access_token);
          return resp.access_token;
        })
      );
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  private handleError(error: any): Observable<any> {

    if (error.status === 400) {
      if (error.error.error === 'invalid_grant') {
        return throwError('Usuário ou senha inválida');
      }
    }

    return throwError(error);
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }
}
