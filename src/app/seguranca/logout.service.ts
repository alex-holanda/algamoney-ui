import { AuthService } from 'src/app/seguranca/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRevokeUrl = `${environment.apiUrl}/token/revoke`;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  logout() {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .pipe(
        catchError(this.handleError),
        map(() => this.auth.limparAccessToken() )
      );
  }

  private handleError(error: any): Observable<any> {

    if (error.status === 400) {
      if (error.error.error === 'invalid_grant') {
        return throwError('Usuário ou senha inválida');
      }
    }

    return throwError(error);
  }
}
