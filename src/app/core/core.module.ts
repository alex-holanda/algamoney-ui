import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrowlModule } from 'primeng/growl';
import { MessageService } from 'primeng/components/common/api';

import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,

    GrowlModule
  ],
exports: [
  NavbarComponent,

  GrowlModule
],
providers: [
  MessageService
]
})
export class CoreModule { }
