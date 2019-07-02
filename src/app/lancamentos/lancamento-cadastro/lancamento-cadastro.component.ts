import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { CategoriaService } from '../../categorias/shared/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from '../../pessoas/shared/pessoa.service';
import { Lancamento } from './../shared/lancamento.model';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = Lancamento.tipos;

  formulario: FormGroup;

  categorias = [];

  pessoas = [];

  constructor(
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private categoriaService: CategoriaService
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

    console.log(lancamento);
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
      pessoaId: [null, Validators.required],
      categoriaId: [null, Validators.required],
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
