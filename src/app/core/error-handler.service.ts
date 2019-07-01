import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/components/common/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService
  ) { }

  handle(errorResponse: any) {

    errorResponse.error.forEach(e => {
      console.log(e.mensagemUsuario);
      this.messageService.add({severity: 'error', detail: e.mensagemUsuario});
    });


  }
}
