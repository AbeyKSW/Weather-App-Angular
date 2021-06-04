import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(public router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError((error) => {

                let handled: boolean = false;
                console.error(error);
                if (error instanceof HttpErrorResponse) {
                    if (error.error instanceof ErrorEvent) {
                        console.error("Error Event");
                    } else {
                        console.log(`error status : ${error.status} ${error.statusText}`);
                        switch (error.status) {
                            case 404:
                                console.log('Data Not Found');
                                handled = true;
                                break;
                            case 500:
                                console.log('Server Error');
                                handled = true;
                                break;
                        }
                    }
                }
                else {
                    console.error("Other Errors");
                    Swal.fire(error.status.toString(), 'Something went wrong! ' + error.status.toString() + '-' + error.statusText, 'error');
                }

                if (handled) {
                    console.log('Display Error Message');
                    Swal.fire(error.status.toString(), 'Something went wrong! ' + error.status.toString() + '-' + error.statusText, 'error');
                    return of(error);
                } else {
                    console.log('Unhandled Error');
                    Swal.fire(error.status.toString(), 'Something went wrong! ' + error.status.toString() + '-' + error.statusText, 'error');
                    return throwError(error);
                }
            })
        )
    }
}