import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WeatherData } from 'src/app/models/weather-data.model';
import { WeatherCityComponent } from '../weather-city/weather-city.component';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  colors: string[] = ['#378DE7', '#6149CB', '#40B681', '#DE934E', '#9C3939'];
  random_color: string = "";
  @Input() weather_data_list: WeatherData[] = [];

  constructor(
    private dialog: MatDialog,
  ) {
    // console.log("Weather Data On Weather Card", this.weather_data_list);
  }

  getRandomColor() {
    this.random_color = this.colors[Math.floor(Math.random() * this.colors.length)];
    console.log('s', this.random_color);
    return this.random_color;
  }

  ngOnInit(): void {

  }

  popUpCity(city: string) {
    // console.log("Form Data", city);
    const dialogRef = this.dialog.open(WeatherCityComponent, { width: '40%', data: city, disableClose: true });
  }

}
