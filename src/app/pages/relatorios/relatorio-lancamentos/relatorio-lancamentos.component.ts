import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { RelatoriosService } from '../shared/relatorios.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  formulario: FormGroup;
  src: string;

  constructor(
    private formBuilder: FormBuilder,
    private relatorioService: RelatoriosService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.configurarFormulario();
  }

  gerar() {
    const inicio =  moment(this.formulario.get('inicio').value).format('YYYY-MM-DD');
    const fim =  moment(this.formulario.get('fim').value).format('YYYY-MM-DD');

    this.relatorioService.relatorioLancamentosPorPessoa(inicio, fim)
      .subscribe(
        resp => {
          this.src = window.URL.createObjectURL(resp);
        },
        error => this.errorHandler.handle(error)
      );
  }

  private configurarFormulario() {
    this.formulario = this.formBuilder.group({
      inicio: [null, Validators.required],
      fim: [null, Validators.required]
    });
  }

  download(resp) {
    const link = document.createElement('a');
    link.href = this.src;
    link.download = `relatorio.pdf`;
    link.click();
  }
}
