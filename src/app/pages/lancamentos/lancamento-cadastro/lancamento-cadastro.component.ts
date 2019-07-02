import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/api';

import { CategoriaService } from '../../categorias/shared/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from '../../pessoas/shared/pessoa.service';
import { Lancamento } from '../shared/lancamento.model';
import { Pessoa } from 'src/app/pages/pessoas/shared/pessoa.model';
import { Categoria } from './../../categorias/shared/categoria.model';
import { LancamentoService } from 'src/app/pages/lancamentos/shared/lancamento.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = Lancamento.tipos;

  formulario: FormGroup;

  categorias: Array<Categoria> = null;

  pessoas: Array<Pessoa> = null;

  constructor(
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private categoriaService: CategoriaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    this.carregarPessoas();
    this.carregarCategorias();
  }

  salvar() {
    this.criar();
  }

  // MÉTODOS PRIVADOS
  private criar() {
    const lancamento: Lancamento = Lancamento.fromJson(this.formulario.value);

    this.lancamentoService.adicionar(lancamento)
      .subscribe(
        resp => {
          this.messageService.add({severity: 'success',
            detail: `${resp.descricao} cadastrado com sucesso`});

          this.formulario.reset();
        },
        error => this.errorHandler.handle(error)
      );
  }

  private carregarPessoas() {
    this.pessoaService.pesquisarTodas()
      .subscribe(
        resp => {
          this.pessoas = resp.pessoas.map(p => ({ label: p.nome, value: p.codigo }));
        },
        error => this.errorHandler.handle(error)
      );
  }

  private carregarCategorias() {
    this.categoriaService.listar()
      .subscribe(
        resp => {
          this.categorias = resp.map(c => ({label: c.nome, value: c.codigo }));
        },
        error => this.errorHandler.handle(error)
      );
  }

  private configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [ this.validarObrigatoriedade, this.validarTamanhoMinimo(5) ]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      observacao: []
    });
  }

  private validarObrigatoriedade(input: FormGroup) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  private validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }
}
