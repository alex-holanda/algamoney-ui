import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageService, ConfirmationService } from 'primeng/components/common/api';
import { GrowlModule } from 'primeng/growl';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,

    GrowlModule,
    ConfirmDialogModule
  ],
exports: [
  NavbarComponent,

  GrowlModule,
  ConfirmDialogModule
],
providers: [
  MessageService,
  ConfirmationService
]
})
export class CoreModule { }
