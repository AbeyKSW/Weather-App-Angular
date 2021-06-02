import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable, of, throwError, interval } from 'rxjs';
import { tap, map, publishReplay, refCount, catchError, finalize } from 'rxjs/operators';

let serviceUrl: String = 'http://api.openweathermap.org/data/2.5/group';
let cityServiceUrl: String = 'http://api.openweathermap.org/data/2.5/weather';
let apiKey: String = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  response: any[] = [];
  apiUrl: string[] = [];

  constructor(private http: HttpClient) {
    this.clearCache();
  }

  getWeatherData(city_ids: number[]) {

    // return this.http.get(serviceUrl + '?id=' + city_ids + '&units=metric' + '&APPID=' + apiKey);
    var apiUrl = serviceUrl + '?id=' + city_ids + '&units=metric' + '&APPID=' + apiKey;
    const http$ = this.http.get(apiUrl);
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

  // Clear configs
  clearCache() {

    var clear = setTimeout(() => {
      this.apiUrl = [];
      this.response = [];
    }, 15000);
  }

  getIconUrl(icon: String) {
    return 'http://openweathermap.org/img/w/' + icon + ".png"
  }

  getWeatherByCity(city_name: String) {
    // return this.http.get(cityServiceUrl + '?q=' + city_name + '&appid=' + apiKey);

    var response;
    var apiUrl = cityServiceUrl + '?q=' + city_name + '&appid=' + apiKey;
    if (this.apiUrl.includes(apiUrl)) {
      response = this.response.find(x => x.city_name == city_name).response;
      console.log("Came from Cache", response);
    }
    else {
      response = this.http.get(apiUrl);
      this.apiUrl.push(apiUrl); // cache url
      var responseObj = {
        city_name: city_name,
        response: response
      }

      this.response.push(responseObj); // cache data
      console.log("Came from Server", this.response);
    }
    return response;
  }
}

