import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CityData } from 'src/app/models/city-data.model';
import { WeatherData } from 'src/app/models/weather-data.model';
import { WeatherService } from 'src/app/services/weather.service';
import cityData from '../../../assets/systemData/cities.json';
import { environment } from '../../../environments/environment';
import { WeatherCityComponent } from '../weather-city/weather-city.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.scss']
})
export class WeatherHomeComponent implements OnInit {

  cityForm: FormGroup;
  cities: CityData[] = [];
  weather_data_list: WeatherData[] = [];

  constructor(
    fb: FormBuilder,
    private dialog: MatDialog,
    private weather_service: WeatherService
  ) {
    this.cityForm = fb.group({
      'city': new FormControl(null),
    });

    this.loadCities();
  }

  loadCities() {
    // this.cities = cityData;
    var cityArr = cityData.List;
    for (var i = 0; i < cityArr.length; i++) {
      var city = new CityData();
      city.cityCode = Number(cityArr[i].CityCode);
      city.cityName = cityArr[i].CityName;
      city.temp = cityArr[i].Temp;
      city.status = cityArr[i].Status;

      this.cities.push(city);
    }

    if (this.cities.length > 0) {
      this.loadData();
    }
  }

  loadData() {
    var city_ids = this.cities.map(({ cityCode }) => cityCode);
    this.weather_service.getWeatherData(city_ids).subscribe((response: any) => {
      var data = response.list;
      console.log("City Data Set", data);
      data.forEach((element: any) => {
        var date = new Date();
        var time = formatDate(date, 'hh:mm a', 'en-US');
        var dateOnly = formatDate(date, 'MMM dd', 'en-US');

        var weather_data = new WeatherData();
        weather_data.city = element.name + ", " + element.sys.country;
        weather_data.date_time = time + ", " + dateOnly;

        weather_data.weather_main = element.weather[0].main;
        weather_data.weather_description = element.weather[0].description;
        weather_data.weather_icon = 'http://openweathermap.org/img/w/' + element.weather[0].icon + '.png';

        weather_data.temp = element.main.temp;
        weather_data.temp_min = element.main.temp_min;
        weather_data.temp_max = element.main.temp_max;

        weather_data.pressure = element.main.pressure;
        weather_data.humidity = element.main.humidity;
        weather_data.visibility = element.visibility;

        weather_data.wind_speed = element.wind.speed;
        weather_data.wind_deg = element.wind.degree;

        var sunrise = new Date(element.sys.sunrise * 1000);
        weather_data.sunrise = formatDate(sunrise, 'hh:mm a', 'en-US');

        var sunset = new Date(element.sys.sunset * 1000);
        weather_data.sunset = formatDate(sunset, 'hh:mm a', 'en-US');

        this.weather_data_list.push(weather_data);
      });

    })
  }

  ngOnInit(): void {
  }

  btnAddCity(data: any) {
    console.log("Form Data", data);
    const dialogRef = this.dialog.open(WeatherCityComponent, { width: '40%', data: data.city, disableClose: true });
  }
}
