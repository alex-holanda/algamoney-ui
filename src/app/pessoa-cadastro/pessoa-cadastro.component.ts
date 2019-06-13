import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();
  }

  salvar() {
    console.log('Salvando...');
  }

  // MÉTODOS PRIVADOS

  private configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      nome: [null, [Validators.required, this.validarTamanhoMinimo(5)]],
      logradouro: [null, Validators.required],
      numero: [null, Validators.required],
      complemento: [],
      bairro: [null, Validators.required],
      cep: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required]
    });
  }

  private validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }
}
