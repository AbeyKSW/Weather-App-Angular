import { Component, Input, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/models/weather-data.model';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  @Input() weather_data_list: WeatherData[] = [];
  constructor() {
    console.log("Weather Data On Weather Card", this.weather_data_list);
  }

  ngOnInit(): void {
  }

}
