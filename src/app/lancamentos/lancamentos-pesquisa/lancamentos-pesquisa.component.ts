import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../lancamento.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  lancamentos = [];

  constructor(
    private lancamentoService: LancamentoService
  ) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    return this.lancamentoService.pesquisar()
      .subscribe(
        lancamentos => this.lancamentos = lancamentos,
        error => alert('Erro ao carregar a lista de lançamentos ')
      );
  }

}
