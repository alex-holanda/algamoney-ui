import { AuthGuard } from 'src/app/seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';

const routes: Routes = [
  {
    path: 'pessoas',
    component: PessoasPesquisaComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_PESQUISAR_PESSOA']
    }
  },
  {
    path: 'pessoas/novo',
    component: PessoaCadastroComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CADASTRAR_PESSOA']
    }
  },
  {
    path: 'pessoas/:codigo',
    component: PessoaCadastroComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CADASTRAR_PESSOA']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
