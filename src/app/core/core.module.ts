import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { MessageService, ConfirmationService } from 'primeng/components/common/api';
import { GrowlModule } from 'primeng/growl';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    NavbarComponent
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

  { provide: LOCALE_ID, useValue: 'pt' }
]
})
export class CoreModule { }
