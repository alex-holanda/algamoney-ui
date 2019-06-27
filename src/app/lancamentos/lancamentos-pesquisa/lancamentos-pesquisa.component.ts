import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService } from 'primeng/components/common/api';

import { LanmentoFiltro } from './../lancamento.service';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LanmentoFiltro();
  formulario: FormGroup;
  lancamentos = [];

  constructor(
    private lancamentoService: LancamentoService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.configurarFormulario();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.filtro.descricao = this.formulario.get('descricao').value;
    this.filtro.dataVencimentoInicio = this.formulario.get('dataVencimentoInicio').value;
    this.filtro.dataVencimentoFim = this.formulario.get('dataVencimentoFim').value;

    return this.lancamentoService.pesquisar( this.filtro )
      .subscribe(
        resultado => {
          this.totalRegistros = resultado.total;
          this.lancamentos = resultado.lancamentos;
        },
        error => alert('Erro ao carregar a lista de lançamentos ')
      );
  }

  excluir(lancamento: any) {
    return this.lancamentoService.excluir(lancamento.codigo)
      .subscribe(
        () => {
          this.pesquisar(0);
          this.messageService.add({severity: 'success', detail: 'Lançamento excluído com sucesso'});
        },
        error => alert('Erro ao carregar a lista de lançamentos ')
      );
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
    // console.log(event);
  }

  private configurarFormulario() {
    this.formulario = this.formBuilder.group({
      descricao: [],
      dataVencimentoInicio: [],
      dataVencimentoFim: []
    });
  }
}
