import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CalendarModule } from 'primeng/calendar';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';

@NgModule({
  declarations: [RelatorioLancamentosComponent],
  imports: [
    CommonModule,

    ReactiveFormsModule,
    SharedModule,

    CalendarModule,

    PdfViewerModule,

    RelatoriosRoutingModule
  ]
})
export class RelatoriosModule { }
