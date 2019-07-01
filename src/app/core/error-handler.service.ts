import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/components/common/api';
import { HttpErrorResponse } from '@angular/common/http';

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
   } else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {
      message = 'Ocorreu um erro ao processar sua solicitação';
   }

   this.messageService.add( { severity: 'error', detail: message } );
  }
}
