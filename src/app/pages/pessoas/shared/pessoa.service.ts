import { Pessoa } from './pessoa.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { PessoaFiltro } from './pessoa-filtro.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')});

  pessoaUrl = `${environment.apiUrl}/pessoas`;

  constructor(
    private http: HttpClient
  ) { }

  adicionar(pessoa: Pessoa): Observable<Pessoa> {

    return this.http.post(`${this.pessoaUrl}`, pessoa, {headers: this.headers})
      .pipe(
        catchError(this.handleError),
        map(Pessoa.fromJson)
      );
  }

  atualizar(pessoa: Pessoa): Observable<Pessoa> {

    return this.http.put(`${this.pessoaUrl}/${pessoa.codigo}`, pessoa, {headers: this.headers})
      .pipe(
        catchError(this.handleError),
        map(resp => {
          return Pessoa.fromJson(resp);
        })
      );
  }

  buscarPorCodigo(codigo: number): Observable<Pessoa> {

    return this.http.get(`${this.pessoaUrl}/${codigo}`, {headers: this.headers})
      .pipe(
        catchError(this.handleError),
        map(resp => {
          const p = Pessoa.fromJson(resp);

          return p;
        })
      );
  }

  pesquisar(filtro: PessoaFiltro): Observable<any> {

    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get(this.pessoaUrl, {headers: this.headers, params})
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

  atualizarPropriedade(codigo: number, ativo: boolean): Observable<any> {
    // const headers = new HttpHeaders()
    //  .set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')})
      .append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoaUrl}/${codigo}/ativo`, ativo, {headers})
      .pipe(
        catchError(this.handleError),
        map( () => null )
      );
  }

  excluir(codigo: number): Observable<any> {

    return this.http.delete(`${this.pessoaUrl}/${codigo}`, {headers: this.headers})
      .pipe(
        catchError(this.handleError),
        map(() => null)
      );
  }

  pesquisarTodas() {

    return this.http.get(this.pessoaUrl, {headers: this.headers})
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
