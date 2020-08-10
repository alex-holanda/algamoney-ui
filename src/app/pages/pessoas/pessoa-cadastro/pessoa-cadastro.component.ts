import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

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
  formularioContato: FormGroup;
  estados: Array<any> = [];
  cidades: Array<any> = [];
  estadoSelecionado: number;

  constructor(
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {  }

  ngOnInit() {
    this.title.setTitle('Nova Pessoa');

    const codigoPessoa = this.route.snapshot.params.codigo;

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }

    this.configurarFormulario();
    this.carregarEstados();
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  carregarEstados() {
    this.pessoaService.listarEstados().subscribe(
      resp => {
        this.estados = resp.map(e => ({ label: e.nome, value: e.codigo }));
      },
      error => this.errorHandler.handle(error)
    );
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado.toString()).subscribe(
      resp => {
        this.cidades = resp.map( e => ({label: e.nome, value: e.codigo}) );
      },
      error => this.errorHandler.handle(error)
    );
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
          this.atualizarTitulo(resp.nome);

          const contatosFormArray = this.formulario.get('contatos') as FormArray;

          resp.contatos.forEach(
            () => {
              contatosFormArray.push(this.createContatosFormGroup());
            }
          );
          this.formulario.patchValue(resp);

          this.estadoSelecionado = resp.endereco.cidade.estado.codigo;
          this.carregarCidades();
        },
        error => this.errorHandler.handle(error)
      );
  }

  private createContatosFormGroup(): FormGroup {
    return this.formBuilder.group({
      codigo: [],
      nome: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      telefone: []
    });
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
        cidade: this.formBuilder.group({
          codigo: [null, Validators.required],
          estado: this.formBuilder.group({
            codigo: [null, Validators.required],
          })
        })
      }),
      contatos: this.formBuilder.array([]),
      ativo: [true]
    });
  }

  private validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }
}
