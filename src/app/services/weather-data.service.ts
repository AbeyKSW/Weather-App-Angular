import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

let serviceUrl: String = 'http://api.openweathermap.org/data/2.5/group';
let cityServiceUrl: String = 'http://api.openweathermap.org/data/2.5/weather';
let apiKey: String = 'f73231112cad5f5b0cde3e1cd9275463';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor(private http: HttpClient) { }

  getWeatherData(city_ids: number[]) {
    return this.http.get(serviceUrl + '?id=' + city_ids + '&units=metric' + '&APPID=' + apiKey)
  }

  getIconUrl(icon: String) {
    return 'http://openweathermap.org/img/w/' + icon + ".png"
  }

  getWeatherByCity(city_name: String) {
    return this.http.get(cityServiceUrl + '?q=' + city_name + '&appid=' + apiKey);
  }
}
