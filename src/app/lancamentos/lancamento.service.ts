import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(
    private http: HttpClient
  ) { }

  pesquisar(): Observable<any> {
    const header = {
      headers: new HttpHeaders().set('Authorization',
     'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
   };

    return this.http.get(this.lancamentosUrl, header)
      .pipe(
        catchError(this.handleError),
        map(resp => resp.content)
      );
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
