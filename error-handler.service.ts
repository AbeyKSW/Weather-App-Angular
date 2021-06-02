import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

    constructor() { }

    handleError(error: Error | HttpErrorResponse) {
        console.log('This error is came from Globle Error Handling')
        console.error(error);
    }

}