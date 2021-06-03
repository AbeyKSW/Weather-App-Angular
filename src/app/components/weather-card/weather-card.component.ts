import { Component, Input, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/models/weather-data.model';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  colors: string[] = ['#378DE7', '#6149CB', '#40B681', '#DE934E', '#9C3939'];
  randomItem: string = "";
  @Input() weather_data_list: WeatherData[] = [];

  constructor() {
    console.log("Weather Data On Weather Card", this.weather_data_list);
  }

  getRandomColor() {
    this.randomItem = this.colors[Math.floor(Math.random() * this.colors.length)];
    console.log('s', this.randomItem);
    return this.randomItem;
  }

  ngOnInit(): void {

  }

}
