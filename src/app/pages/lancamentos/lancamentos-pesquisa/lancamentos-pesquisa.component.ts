import { AuthService } from './../../../seguranca/auth.service';
import { LancamentoFiltro } from '../shared/lancamento-filtro.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';

import { LancamentoService } from '../shared/lancamento.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  formulario: FormGroup;
  lancamentos = [];

  constructor(
    private lancamentoService: LancamentoService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de lançamentos');
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
        error => this.errorHandler.handle(error)
      );
  }

  confirmarExclusao(lancamento: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => { this.excluir(lancamento); }
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
    // console.log(event);
  }

  private excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .subscribe(
        () => {
          this.pesquisar(0);
          this.messageService.add({severity: 'success', detail: 'Lançamento excluído com sucesso'});
        },
        error => this.errorHandler.handle(error)
      );
  }

  private configurarFormulario() {
    this.formulario = this.formBuilder.group({
      descricao: [],
      dataVencimentoInicio: [],
      dataVencimentoFim: []
    });
  }
}
