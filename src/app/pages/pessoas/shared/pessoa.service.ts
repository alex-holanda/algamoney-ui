import { Pessoa } from './pessoa.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { PessoaFiltro } from './pessoa-filtro.model';
import { environment } from 'src/environments/environment';
import { Estado } from './estado.model';
import { Cidade } from './cidade.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoaUrl = `${environment.apiUrl}/pessoas`;
  cidadesUrl = `${environment.apiUrl}/cidades`;
  estadorUrl =  `${environment.apiUrl}/estados`;

  constructor(
    private http: HttpClient
  ) { }

  adicionar(pessoa: Pessoa): Observable<Pessoa> {

    return this.http.post(`${this.pessoaUrl}`, pessoa)
      .pipe(
        catchError(this.handleError),
        map(Pessoa.fromJson)
      );
  }

  atualizar(pessoa: Pessoa): Observable<Pessoa> {

    return this.http.put(`${this.pessoaUrl}/${pessoa.codigo}`, pessoa)
      .pipe(
        catchError(this.handleError),
        map(resp => {
          return Pessoa.fromJson(resp);
        })
      );
  }

  buscarPorCodigo(codigo: number): Observable<Pessoa> {

    return this.http.get(`${this.pessoaUrl}/${codigo}`)
      .pipe(
        catchError(this.handleError),
        map(resp => Pessoa.fromJson(resp))
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

    return this.http.get(this.pessoaUrl, { params})
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

    return this.http.put(`${this.pessoaUrl}/${codigo}/ativo`, ativo)
      .pipe(
        catchError(this.handleError),
        map( () => null )
      );
  }

  excluir(codigo: number): Observable<any> {

    return this.http.delete(`${this.pessoaUrl}/${codigo}`)
      .pipe(
        catchError(this.handleError),
        map(() => null)
      );
  }

  pesquisarTodas() {

    return this.http.get(this.pessoaUrl)
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

  listarEstados(): Observable<Array<Estado>> {

    return this.http.get(this.estadorUrl)
      .pipe(
        catchError(this.handleError),
        map(estados => this.jsonDataToResources(estados))
      );
  }

  private jsonDataToResources(jsonData: any[]): Array<Estado> {
    const estados: Array<Estado> = [];

    jsonData.forEach(
      e => {
        const estado = Estado.fromJson(e);
        estados.push(Estado.fromJson(estado));
      }
    );

    return estados;
  }

  pesquisarCidades(estado: string): Observable<Array<Cidade>> {
    const params = new HttpParams().append('estado', estado);

    return this.http.get(this.cidadesUrl, { params })
      .pipe(
        catchError(this.handleError),
        map(cidades => Cidade.jsonDataToResources(cidades))
      );
  }
}
