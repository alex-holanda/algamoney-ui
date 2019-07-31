import { LancamentoEstatisticaCategoria } from './../shared/lancamento-estatistica-categoria.model';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../shared/dashboard.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;
  lineChartData: any;

  constructor(
    private dashboardService: DashboardService,
    private errorHandler: ErrorHandlerService,
  ) { }

  ngOnInit() {
    this.configurarGraficoPizza();
    // this.configurarGraficaLinha();
  }

  configurarGraficoPizza() {
    this.dashboardService.lancamentosPorCategoria()
      .subscribe(
        resp => {
          this.pieChartData = {
            labels: resp.map(dado => dado.categoria.nome),
            datasets: [
              {
                data: resp.map(dado => dado.total),
                backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC',
                                    '#DD4477', '#3366CC', '#DC3912']
              }
            ]
          };
        },
        error => this.errorHandler.handle(error)
      );
  }

  configurarGraficaLinha() {
    this.dashboardService.lancamentosPorDia()
      .subscribe(
        resp => {
          const diasDoMes = this.configurarDiasMes();
          const totaisReceitas = this.totaisPorCadaDiaMes(
            resp.filter(
              dado => dado.tipo === 'RECEITA'
              ),
            diasDoMes);

          const totaisDespesas = this.totaisPorCadaDiaMes(
              resp.filter(
                dado => dado.tipo === 'DESPESA'
                ),
              diasDoMes);

          this.lineChartData = {
            labels: diasDoMes,
            datasets: [
              {
                label: 'Receitas',
                data: totaisReceitas,
                borderColor: '#3366CC'
              },
              {
                label: 'Despesas',
                data: totaisDespesas,
                borderColor: '#D62B00'
              }
            ]
          };
        },
        error => this.errorHandler.handle(error)
      );
  }

  private totaisPorCadaDiaMes(dados, diasDoMes) {
    const totais: number[] = [];

    for (const dia of diasDoMes) {
      let total = 0;

      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;
          break;
        }
      }

      totais.push(total);
    }

    return totais;
  }

  private configurarDiasMes() {
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();

    const dias: number[] = [];

    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }

    return dias;
  }
}
