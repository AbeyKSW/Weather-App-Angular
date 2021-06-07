import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpRequest,
  HttpResponse,
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

abstract class HttpCache {
  abstract get(req: HttpRequest<any>): HttpResponse<any> | null;
  abstract put(req: HttpRequest<any>, respond: HttpResponse<any>): void;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService implements HttpCache {
  private cache: any = {};

  constructor() {}

  get(req: HttpRequest<any>): HttpResponse<any> | null {
    const now = new Date();
    var req_url = req.urlWithParams;
    var row_data = localStorage.getItem(req_url);

    if (!row_data) {
      return null;
    }

    const item = JSON.parse(row_data);

    if (now.getTime() > item.expiry) {
      console.log("Expired");
      localStorage.removeItem(req_url);
      return null;
    }

    this.cache[req_url] = item.value == {} ? null : item.value;
    return this.cache[req_url];
  }

  put(req: HttpRequest<any>, respond: HttpResponse<any>): void {
    const now = new Date();
    const CACHE_EXP_TIME = 1000 * 60; // * 5
    this.cache[req.urlWithParams] = respond;
    const item = {
      value: respond, //original value
      expiry: now.getTime() + CACHE_EXP_TIME, //the time when it's supposed to expire
    };
    localStorage.setItem(req.urlWithParams, JSON.stringify(item));
  }
}
