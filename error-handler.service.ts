import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

    constructor() { }

    handleError(error: Error | HttpErrorResponse) {
        console.log('This error is came from Globle Error Handling');
        Swal.fire('Ops!', 'Something went wrong!', 'error');
        console.error(error);
    }

}