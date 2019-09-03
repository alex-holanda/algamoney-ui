import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';

import { JwtHelperService } from '@auth0/angular-jwt';

import { MessageService, ConfirmationService } from 'primeng/components/common/api';
import { GrowlModule } from 'primeng/growl';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { InterceptorService } from '../seguranca/interceptor.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

import { AuthService } from './../seguranca/auth.service';
import { LancamentoService } from 'src/app/pages/lancamentos/shared/lancamento.service';
import { RelatoriosService } from './../pages/relatorios/shared/relatorios.service';
import { DashboardService } from './../pages/dashboard/shared/dashboard.service';
import { CategoriaService } from './../pages/categorias/shared/categoria.service';
import { PessoaService } from './../pages/pessoas/shared/pessoa.service';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  imports: [
    CommonModule,

    GrowlModule,
    ConfirmDialogModule,
    RouterModule
  ],
exports: [
  NavbarComponent,

  GrowlModule,
  ConfirmDialogModule
],
providers: [
  ErrorHandlerService,

  MessageService,
  ConfirmationService,

  LancamentoService,
  PessoaService,
  CategoriaService,
  DashboardService,
  RelatoriosService,

  AuthService,

  JwtHelperService,

  Title,

  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  },

  { provide: LOCALE_ID, useValue: 'pt' }
]
})
export class CoreModule { }
