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
    let message: string;

    if (typeof errorResponse === 'string') {
      message = errorResponse;
    } else {
      message = 'Erro ao processar serviço remoto. Tente novamente';
      console.log('Ocorreu um erro ', errorResponse);
    }

    this.messageService.add({severity: 'error', detail: message});
  }
}
