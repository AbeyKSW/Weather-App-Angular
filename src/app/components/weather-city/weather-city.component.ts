import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WeatherData } from 'src/app/models/weather-data.model';
import { WeatherService } from 'src/app/services/weather.service';
import { faPaperPlane, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-city',
  templateUrl: './weather-city.component.html',
  styleUrls: ['./weather-city.component.scss']
})
export class WeatherCityComponent implements OnInit {

  weather_data: WeatherData = new WeatherData();
  faPaperPlane = faPaperPlane;
  faArrowLeft = faArrowLeft;

  constructor(
    private weather_data_service: WeatherService,
    public dialogRef: MatDialogRef<WeatherCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    dialogRef.disableClose = true;
    this.loadData(data);
  }

  loadData(city_name: String) {
    if (city_name != null) {
      this.weather_data_service.getWeatherByCity(city_name).subscribe((response: any) => {
        console.log("Response", response);
        var data = response;

        var date = new Date();
        var time = formatDate(date, 'hh:mm a', 'en-US');
        var dateOnly = formatDate(date, 'MMM dd', 'en-US');

        var weather_data = new WeatherData();
        weather_data.city = data.name + ", " + data.sys.country;
        weather_data.date_time = time + ", " + dateOnly;

        weather_data.weather_main = data.weather[0].main;
        weather_data.weather_description = data.weather[0].description;
        weather_data.weather_icon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';

        weather_data.temp = data.main.temp;
        weather_data.temp_min = data.main.temp_min;
        weather_data.temp_max = data.main.temp_max;

        weather_data.pressure = data.main.pressure;
        weather_data.humidity = data.main.humidity;
        weather_data.visibility = data.visibility;

        weather_data.wind_speed = data.wind.speed;
        weather_data.wind_deg = data.wind.degree;

        var sunrise = new Date(data.sys.sunrise * 1000);
        weather_data.sunrise = formatDate(sunrise, 'hh:mm a', 'en-US');

        var sunset = new Date(data.sys.sunset * 1000);
        weather_data.sunset = formatDate(sunset, 'hh:mm a', 'en-US');

        this.weather_data = weather_data;
      })
    }
  }

  ngOnInit(): void {
  }

  btnClose() {
    this.dialogRef.close();
  }

}