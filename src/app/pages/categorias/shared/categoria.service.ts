import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl = `${environment.apiUrl}/categorias`;

  constructor(
    private http: HttpClient
  ) { }

  listar() {
    return this.http.get(`${this.categoriaUrl}`)
      .pipe(
        catchError(this.handleError),
        map(resp => resp)
      );
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
