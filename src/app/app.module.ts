import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { LancamentosModule } from './pages/lancamentos/lancamentos.module';
import { PessoasModule } from './pages/pessoas/pessoas.module';
import { LancamentoCadastroComponent } from './pages/lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './pages/lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { PessoaCadastroComponent } from './pages/pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pages/pessoas/pessoas-pesquisa/pessoas-pesquisa.component';

const routes: Routes = [
  { path: 'lancamentos', component: LancamentosPesquisaComponent },
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
  { path: 'pessoas', component: PessoasPesquisaComponent },
  { path: 'pessoas/novo', component: PessoaCadastroComponent },
  { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent }

];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    HttpClientModule,

    RouterModule.forRoot(routes),

    LancamentosModule,
    PessoasModule,

    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
