import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Contato } from '../shared/contato.model';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

  @Input() contatos: Array<Contato>;

  contatoIndex: number;

  formularioContato: FormGroup;

  exibindoFormularioContato = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.configurarFormulario();
  }

  salvarContato() {
    this.contatos.push(Contato.fromJson(this.formularioContato.value));
    this.formularioContato.reset();
    this.exibindoFormularioContato = false;
  }

  prepararNovoContato() {
    this.exibindoFormularioContato = true;
  }

  configurarFormulario() {
    this.formularioContato = this.formBuilder.group({
      codigo: [],
      nome: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      telefone: []
    });
  }
}
