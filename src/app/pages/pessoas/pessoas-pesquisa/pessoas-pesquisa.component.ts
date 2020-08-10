import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaFiltro } from '../shared/pessoa-filtro.model';
import { PessoaService } from '../shared/pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  formulario: FormGroup;
  pessoas = [];

  constructor(
    private pessoaService: PessoaService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Lista de pessoas');
    this.configurarFormulario();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.filtro.nome = this.formulario.get('nome').value;

    return this.pessoaService.pesquisar(this.filtro)
      .subscribe(
        resultado => {
          this.pessoas = resultado.pessoas;
          this.totalRegistros = resultado.total;
        },
        error => alert('Erro ao carregar a lista de lançamentos ')
      );
  }

  atualizarPropriedade(codigo: number, ativo: boolean) {

    this.pessoaService.atualizarPropriedade(codigo, ativo)
      .subscribe(
        () => {
          this.pesquisar(0);
          this.messageService.add({ severity: 'success',
            detail: 'Propriedade de pessoa atualizada com sucesso' });
        },
        error => this.errorHandler.handle(error)
      );
  }

  confirmarExclusao(pessoa: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => { this.excluir(pessoa); }
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  private excluir(pessoa: any) {

    this.pessoaService.excluir(pessoa.codigo)
      .subscribe(
        () => {
          this.pesquisar(0);
          this.messageService.add({ severity: 'success', detail: 'Pessoa deletada com sucesso.' });
        },
        error => this.errorHandler.handle(error)
      );
  }

  private configurarFormulario() {
    this.formulario = this.formBuilder.group({
      nome: []
    });
  }
}
