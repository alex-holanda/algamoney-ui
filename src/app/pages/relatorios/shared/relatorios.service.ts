import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentosUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos/relatorios`;
  }

  relatorioLancamentosPorPessoa(inicio: string, fim: string) {
    const params = new HttpParams()
      .append('inicio', inicio)
      .append('fim', fim);

    return this.http.get(`${this.lancamentosUrl}/por-pessoa`, { params, responseType: 'blob'});
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
