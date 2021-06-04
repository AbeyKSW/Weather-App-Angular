import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpResponse, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';

abstract class HttpCache {
  abstract get(req: HttpRequest<any>): HttpResponse<any> | null;
  abstract put(req: HttpRequest<any>, respond: HttpResponse<any>): void;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService implements HttpCache {

  private cache: any = {};

  constructor() { }

  get(req: HttpRequest<any>): HttpResponse<any> | null {

    var req_url = req.urlWithParams;
    var row_data = localStorage.getItem(req_url);

    // This is the code for getting data from local storage. When this open this passes the data to the cache-interceptor correctly.
    // if (row_data) {
    //   var data = JSON.parse(localStorage.getItem(req_url) || '{}');
    //   this.cache[req_url] = data == {} ? null : data;
    //   console.log("Cached Data from Local Storage", data);
    //   console.log("Cached Data from this.cache", this.cache[req_url]);
    // }

    return this.cache[req_url];
  }

  put(req: HttpRequest<any>, respond: HttpResponse<any>): void {
    console.log("Cached Data 232");
    this.cache[req.urlWithParams] = respond;
    localStorage.setItem(req.urlWithParams, JSON.stringify(respond));
  }
}
