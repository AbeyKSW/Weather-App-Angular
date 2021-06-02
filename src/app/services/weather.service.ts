import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable, of, throwError, interval, timer } from 'rxjs';
import { tap, map, publishReplay, refCount, catchError, finalize, switchMap } from 'rxjs/operators';

let serviceUrl: String = 'http://api.openweathermap.org/data/2.5/group';
let cityServiceUrl: String = 'http://api.openweathermap.org/data/2.5/weather';
let apiKey: String = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  response: any[] = [];
  apiUrl: string[] = [];
  cities!: Observable<Array<any>>;

  constructor(private http: HttpClient) {
    this.clearCache();
  }

  getWeatherData(city_ids: number[]) {

    // return this.http.get(serviceUrl + '?id=' + city_ids + '&units=metric' + '&APPID=' + apiKey);
    var apiUrl = serviceUrl + '?id=' + city_ids + '&units=metric' + '&APPID=' + apiKey;
    const http$ = this.http.get<any>(apiUrl);

    http$
      .pipe(
        catchError((err) => {
          console.log('error caught in service - ', err)
          console.error(err);
          return throwError(err);
        })
      )

    return http$;

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

  getWeatherByCityNew(city_name: String): Observable<Array<any>> {
    var apiUrl = cityServiceUrl + '?q=' + city_name + '&appid=' + apiKey;

    if (!this.cities) {
      // this.cities = timer(0, 15000)
      //   .pipe(
      //     switchMap(() => {
      //       if (this.apiUrl.includes(apiUrl)) {
      //         console.log("Sending cached data");
      //         return this.cities
      //       }
      //       else {
      //         console.log('REQUESTING DATA....');
      //         var city_details = this.http.get<any>(apiUrl).pipe(
      //           catchError((err) => {
      //             console.log('error caught in service - ', err)
      //             console.error(err);
      //             return throwError(err);
      //           })
      //         );
      //         console.log('City Details', city_details);
      //         return city_details;
      //       }
      //     }),
      //     map((response) => response),
      //     publishReplay(1),
      //     refCount()
      //   )

      this.cities = this.http.get<any>(apiUrl)
        .pipe(
          map((response) => response),
          publishReplay(1),
          refCount()
        )

    }
    return this.cities;
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
      response = this.http.get<any>(apiUrl)
        .pipe(
          catchError((err) => {
            console.log('error caught in service - ', err)
            console.error(err);
            return throwError(err);
          })
        );
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

