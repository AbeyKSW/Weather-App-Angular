import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable, of, throwError, interval, timer, Subject } from 'rxjs';
import { tap, map, publishReplay, refCount, catchError, finalize, switchMap, takeUntil, shareReplay } from 'rxjs/operators';

let service_url: String = 'http://api.openweathermap.org/data/2.5/group';
let city_service_url: String = 'http://api.openweathermap.org/data/2.5/weather';
let api_key: String = environment.API_URL;

const REFRESH_INTERVAL = 10000;
const CACHE_SIZE = 1;

export interface City {
  id: number;
  city: string;
  response: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  city_list: any[] = [];
  cache_responses: any[] = [];
  api_url: string[] = [];
  cities!: Observable<Array<any>>;

  private cache$?: Observable<Array<City>>;
  private reload$ = new Subject<void>();

  constructor(private http: HttpClient) {
    this.clearCache();
  }

  getWeatherData(city_ids: number[]) {

    var city_list;
    var api_url = service_url + '?id=' + city_ids + '&units=metric' + '&APPID=' + api_key;
    console.log("Getting weather data for cities");

    //#region Comments
    // if (this.api_url.includes(api_url)) {
    //   city_list = this.city_list.find(x => x.api_url == api_url).city_list;
    //   console.log("Came from Cache", city_list);
    // }
    // else {

    //   city_list = this.http.get<any>(api_url)
    //     .pipe(
    //       shareReplay(),
    //       catchError((err) => {
    //         console.log('error caught in service - ', err)
    //         console.error(err);
    //         return throwError(err);
    //       })
    //     );
    //   this.api_url.push(api_url); // cache url
    //   var city_list_obj = {
    //     api_url: api_url,
    //     city_list: city_list
    //   }

    //   this.city_list.push(city_list_obj); // cache data
    // }
    //#endregion

    city_list = this.http.get<any>(api_url)
      .pipe(
        shareReplay(),
        catchError((err) => {
          console.log('error caught in service - ', err)
          console.error(err);
          return throwError(err);
        })
      );

    console.log("City List", city_list);

    return city_list;

  }

  // Clear configs
  clearCache() {
    var clear = setTimeout(() => {
      this.api_url = [];
      this.cache_responses = [];
    }, 15000);
  }

  getIconUrl(icon: String) {
    return 'http://openweathermap.org/img/w/' + icon + ".png"
  }

  getWeatherByCityNew(city_name: String): Observable<Array<any>> {
    var api_url = city_service_url + '?q=' + city_name + '&appid=' + api_key;

    if (!this.cities) {
      this.cities = this.http.get<any>(api_url)
        .pipe(
          map((response) => response),
          publishReplay(1),
          refCount()
        )

    }
    return this.cities;
  }

  getWeatherByCity(city_name: String) {
    // return this.http.get(city_service_url + '?q=' + city_name + '&appid=' + api_key);

    var city_detail;
    var api_url = city_service_url + '?q=' + city_name.toLowerCase() + '&appid=' + api_key;
    // if (this.api_url.includes(api_url)) {
    //   city_detail = this.cache_responses.find(x => x.city_name == city_name).response;
    //   console.log("Came from Cache", city_detail);
    // }
    // else {
    //   city_detail = this.http.get<any>(api_url)
    //     .pipe(
    //       shareReplay(),
    //       catchError((err) => {
    //         console.log('error caught in service - ', err)
    //         console.error(err);
    //         return throwError(err);
    //       })
    //     );
    //   this.api_url.push(api_url); // cache url
    //   var cache_response = {
    //     city_name: city_name,
    //     response: city_detail
    //   }

    //   this.cache_responses.push(cache_response); // cache data
    //   console.log("Came from Server", this.cache_responses);
    // }

    city_detail = this.http.get<any>(api_url)
      .pipe(
        shareReplay(),
        catchError((err) => {
          console.log('error caught in service - ', err)
          console.error(err);
          return throwError(err);
        })
      );

    return city_detail;
  }

  getCityWeatherDetails(city_name: String) {
    console.log("Pre Cache", this.cache$);

    if (!this.cache$) {

      // console.log("Main city_name", city_name);
      const timer$ = timer(0, REFRESH_INTERVAL);

      this.cache$ = timer$.pipe(
        switchMap(() => this.requestCityDetail(city_name)),
        takeUntil(this.reload$),
        shareReplay(CACHE_SIZE)
      );
    }
    else {
      // console.log("Cache city_name", city_name);
      this.cache$ = this.requestCityDetail(city_name).pipe(
        takeUntil(this.reload$),
        shareReplay(CACHE_SIZE)
      );
    }

    console.log("Post Cache", this.cache$);

    return this.cache$;
  }

  requestCityDetail(city_name: String) {
    var api_url = city_service_url + '?q=' + city_name + '&appid=' + api_key;
    return this.http.get<any>(api_url).pipe(
      map(response => response)
    );
  }
}

