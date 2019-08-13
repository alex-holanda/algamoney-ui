import { ActivatedRoute, Router } from '@angular/router';
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
import { Title } from '@angular/platform-browser';

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

  uploadEmAndamento = false;

  constructor(
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private categoriaService: CategoriaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params.codigo;

    this.title.setTitle('Novo lançamento');

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.configurarFormulario();
    this.carregarPessoas();
    this.carregarCategorias();
  }

  get urlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo();
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  get nomeAnexo() {
    const nome = this.formulario.get('anexo').value;

    if (nome) {
      return nome.substring(nome.indexOf('_') + 1, nome.length);
    }

    return '';
  }

  antesUploadAnexo(event) {
    this.uploadEmAndamento = true;
  }

  aoTerminarUploadAnexo(event) {
    console.log('>>> ' , event.originalEvent.body);
    const anexo = event.originalEvent.body;

    this.formulario.patchValue({
      anexo: anexo.nome,
      urlAnexo: anexo.url
    });

    this.uploadEmAndamento = false;
  }

  erroUpload(event) {
    this.messageService.add({severity: 'error',
            detail: 'Erro ao tentar enviar anexo'});

    this.uploadEmAndamento = false;
  }

  salvar() {
    if (this.editando) {
      this.atualizar();
    } else {
      this.adicionar();
    }
  }

  carregarLancamento(codigo: number) {
    this.buscarPorCodigo(codigo);
  }

  novo() {
    this.configurarFormulario();

    this.router.navigate(['/lancamentos/novo']);
  }

  removerAnexo() {
    this.formulario.patchValue({
      anexo: null,
      urlAnexo: null
    });
  }

  // MÉTODOS PRIVADOS
  private atualizar() {
    const lancamento: Lancamento = Lancamento.fromJson(this.formulario.value);

    this.lancamentoService.atualizar(lancamento)
      .subscribe(
        resp => {
          this.messageService.add({severity: 'success',
            detail: `${resp.descricao} atualizado com sucesso`});

          this.atualizarTitulo(resp.descricao);
        },
        error => this.errorHandler.handle(error)
      );
  }

  private buscarPorCodigo(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .subscribe(
        resp => {
          this.formulario.patchValue(resp);
          this.atualizarTitulo(resp.descricao);
        },
        error => this.errorHandler.handle(error)
      );
  }

  private adicionar() {
    const lancamento: Lancamento = Lancamento.fromJson(this.formulario.value);

    this.lancamentoService.adicionar(lancamento)
      .subscribe(
        resp => {
          this.messageService.add({severity: 'success',
            detail: `${resp.descricao} cadastrado com sucesso`});

          // this.formulario.reset();

          this.router.navigate(['/lancamentos', resp.codigo]);
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
      observacao: [],
      anexo: [],
      urlAnexo: []
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

  private atualizarTitulo(descricao: string) {
    this.title.setTitle(`Editando lançamento: ${descricao}`);
  }
}
