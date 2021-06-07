import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  HttpRequest,
  HttpResponse,
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { CacheService } from 'src/app/services/cache.service';

@Injectable()
export class CacheInterceptorService implements HttpInterceptor {
  constructor(private cacheService: CacheService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Came to Cache Interceptor');
    const CACHED_RESPONSE = this.cacheService.get(req) || null; // When it comes from the local storage this return the correct data
    console.log('CACHED RESPONSE', CACHED_RESPONSE);

    if (CACHED_RESPONSE) {
      console.log('Serves from the Cache', CACHED_RESPONSE);

      let httpResponse = new HttpResponse({
        body: CACHED_RESPONSE.body,
        headers: CACHED_RESPONSE.headers,
        status: CACHED_RESPONSE.status,
        statusText: CACHED_RESPONSE.statusText,
        url: CACHED_RESPONSE.url || '',
      });

      return of(httpResponse); // When it comes from local storage this won't return the value.
    }

    console.log('Serves from the Server');
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          console.log('Insert to the cache');
          this.cacheService.put(req, event);
        }
      })
    );
  }
}
