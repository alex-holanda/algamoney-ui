import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/components/common/api';

import { Pessoa } from '../shared/pessoa.model';
import { PessoaService } from '../shared/pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova Pessoa');

    const codigoPessoa = this.route.snapshot.params.codigo;

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }

    this.configurarFormulario();
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  salvar() {
    if (this.editando) {
      this.atualizar();
    } else {
      this.adiconar();
    }
  }

  carregarPessoa(codigo: number) {
    this.buscarPorCodigo(codigo);
  }

  novo() {
    this.configurarFormulario();

    this.router.navigate(['/pessoas/novo']);
  }

  // MÉTODOS PRIVADOS
  private atualizar() {
    const pessoa = Pessoa.fromJson(this.formulario.value);

    this.pessoaService.atualizar(pessoa)
      .subscribe(
        resp => {
          this.messageService.add({severity: 'success',
            detail: `${resp.nome} atualizada com sucesso`});

          this.atualizarTitulo(resp.nome);
        },
        error => this.errorHandler.handle(error)
      );
  }

  private buscarPorCodigo(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .subscribe(
        resp => {
          this.formulario.patchValue(resp);
          this.atualizarTitulo(resp.nome);
        },
        error => this.errorHandler.handle(error)
      );
  }

  private atualizarTitulo(nome: string) {
    this.title.setTitle(`Editando pessoa: ${nome}`);
  }

  private adiconar() {
    const pessoa: Pessoa = Pessoa.fromJson(this.formulario.value);

    this.pessoaService.adicionar(pessoa)
      .subscribe(
        resp => {
          this.messageService.add({severity: 'success',
            detail: `${resp.nome} cadastrado com sucesso`});

          this.formulario.reset();
        },
        error => this.errorHandler.handle(error)
      );
  }

  private configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      nome: [null, [Validators.required, this.validarTamanhoMinimo(5)]],
      endereco: this.formBuilder.group({
        logradouro: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [],
        bairro: [null, Validators.required],
        cep: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      ativo: [true]
    });
  }

  private validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }
}
