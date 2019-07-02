import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl = 'http://localhost:8080/categorias';

  constructor(
    private http: HttpClient
  ) { }

  listar() {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.categoriaUrl}`, { headers })
      .pipe(
        catchError(this.handleError),
        map(resp => resp)
      );
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
