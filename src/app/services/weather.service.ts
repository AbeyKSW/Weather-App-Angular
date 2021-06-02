import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { tap, map, catchError, finalize } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

let serviceUrl: String = 'http://api.openweathermap.org/data/2.5/group';
let cityServiceUrl: String = 'http://api.openweathermap.org/data/2.5/weather';
let apiKey: String = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherData(city_ids: number[]) {

    console.log("Came Here", serviceUrl, city_ids, apiKey);
    // return this.http.get(serviceUrl + '?id=' + city_ids + '&units=metric' + '&APPID=' + apiKey);
    const http$ = this.http.get(serviceUrl + '?id=' + city_ids + '&units=metric' + '&APPID=' + apiKey);
    return http$;
    // http$
    //   .pipe(
    //     map(res => res['payload']),
    //     catchError(err => {
    //       console.log('caught mapping error and rethrowing', err);
    //       return throwError(err);
    //     }),
    //     finalize(() => console.log("first finalize() block executed")),
    //     catchError(err => {
    //       console.log('caught rethrown error, providing fallback value');
    //       return of([]);
    //     }),
    //     finalize(() => console.log("second finalize() block executed"))
    //   )
    //   .subscribe(
    //     res => console.log('HTTP response', res),
    //     err => console.log('HTTP Error', err),
    //     () => console.log('HTTP request completed.')
    //   );
  }

  getIconUrl(icon: String) {
    return 'http://openweathermap.org/img/w/' + icon + ".png"
  }

  getWeatherByCity(city_name: String) {
    return this.http.get(cityServiceUrl + '?q=' + city_name + '&appid=' + apiKey);
  }
}

