import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.configurarFormulario();
  }

  login() {
    this.auth.login(this.formulario.get('usuario').value,
      this.formulario.get('senha').value)
      .subscribe(
        () => {
          this.router.navigate(['/lancamentos']);
        },
        error => {
          this.formulario.get('senha').patchValue('');
          this.errorHandler.handle(error);
        }
      );
  }

  private configurarFormulario() {
    this.formulario = this.formBuilder.group({
      usuario: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(4)]]
    });
  }
}
