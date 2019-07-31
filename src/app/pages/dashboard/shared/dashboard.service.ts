import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import * as moment from 'moment';

import { environment } from 'src/environments/environment';

import { LancamentoEstatisticaCategoria } from './lancamento-estatistica-categoria.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lancamentosUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  lancamentosPorCategoria(): Observable<Array<LancamentoEstatisticaCategoria>> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-categoria`)
      .pipe(
        catchError(this.handleError),
        map(resp => {
          const lancamentoEstatisticaCategoria: Array<LancamentoEstatisticaCategoria> = resp;

          return lancamentoEstatisticaCategoria;
        })
      );
  }

  lancamentosPorDia(): Observable<any> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-dia`)
      .pipe(
        catchError(this.handleError),
        map(resp => this.converterStringsParaDatas(resp))
      );
  }

  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
