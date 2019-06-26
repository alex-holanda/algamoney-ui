import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { LazyLoadEvent } from 'primeng/components/common/api';

import { PessoaService, PessoaFilter } from './../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFilter();
  formulario: FormGroup;
  pessoas = [];

  constructor(
    private pessoaService: PessoaService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
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

  private configurarFormulario() {
    this.formulario = this.formBuilder.group({
      nome: []
    });
  }
}
