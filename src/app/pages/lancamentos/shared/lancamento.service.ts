import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHandler, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import * as moment from 'moment';
import 'moment/locale/pt-br';

import { Lancamento } from './lancamento.model';
import { LancamentoFiltro } from './lancamento-filtro.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = `${environment.apiUrl}/lancamentos`;

  constructor(
    private http: HttpClient
  ) { }

  atualizar(lancamento: Lancamento) {

    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento)
      .pipe(
        catchError(this.handleError),
        map(resp => {
          const lanc = Lancamento.fromJson(resp);

          this.converterStringsParaDatas([lanc]);

          return lanc;
        })
      );
  }

  buscarPorCodigo(codigo: number): Observable<Lancamento> {

    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
      .pipe(
        catchError(this.handleError),
        map(resp => {
          const lancamento = Lancamento.fromJson(resp);

          this.converterStringsParaDatas([lancamento]);

          return lancamento;
        })
      );
  }

  adicionar(lancamento: Lancamento): Observable<Lancamento> {

    return this.http.post(`${this.lancamentosUrl}`, lancamento)
      .pipe(
        catchError(this.handleError),
        map(Lancamento.fromJson)
      );
  }

  pesquisar(filtro: LancamentoFiltro): Observable<any> {

    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.append('dataVencimentoDe',
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.append('dataVencimentoAte',
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { params })
      .pipe(
        catchError(this.handleError),
        map(response => {
          const lancamentos = this.jsonDataToResources(response.content);

          const resultado = {
            lancamentos,
            total: response.totalElements
          };

          return resultado;
        })
      );
  }

  excluir(codigo: number): Observable<void> {

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .pipe(
        catchError(this.handleError),
        map(() => null)
      );
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }

  private jsonDataToResources(jsonData: any[]): Lancamento[] {
    const lancamentos: Lancamento[] = [];

    jsonData.forEach(
      e => {
        const lancamento = Lancamento.fromJson(e);
        this.converterStringsParaDatas([lancamento]);
        lancamentos.push(Lancamento.fromJson(lancamento));
      }
    );

    return lancamentos;
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }
}
