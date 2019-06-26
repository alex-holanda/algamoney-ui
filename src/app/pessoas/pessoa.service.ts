import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export class PessoaFilter {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoaUrl = 'http://localhost:8080/pessoas';

  constructor(
    private http: HttpClient
  ) { }

  pesquisar(filtro: PessoaFilter): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get(this.pessoaUrl, { headers, params })
      .pipe(
        catchError(this.handleError),
        map(resp => {
          const pessoas = resp.content;

          const resultado = {
            pessoas,
            total: resp.totalElements
          };

          return resultado;
        })
      );
  }

  pesquisarTodas() {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.pessoaUrl, { headers })
      .pipe(
        catchError(this.handleError),
        map(resp => {
          const pessoas = resp.content;
          const resultado = {
            pessoas,
            total: resp.totalElements
          };

          return resultado;
        })
      );
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
