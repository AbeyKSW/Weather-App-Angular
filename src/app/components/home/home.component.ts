import { formatDate } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WeatherData } from 'src/app/models/weather-data.model';
import { WeatherDataService } from 'src/app/services/weather-data.service';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { DisplayComponent } from '../display/display.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  cityForm: FormGroup;
  cities: any[] = [
    { "CityCode": "1248991", "CityName": "Colombo", "Temp": "33.0", "Status": "Clouds" },
    { "CityCode": "1850147", "CityName": "Tokyo", "Temp": "8.6", "Status": "Clear" },
    { "CityCode": "2644210", "CityName": "Liverpool", "Temp": "16.5", "Status": "Rain" },
    { "CityCode": "2988507", "CityName": "Paris", "Temp": "22.4", "Status": "Clear" },
    { "CityCode": "2147714", "CityName": "Sydney", "Temp": "27.3", "Status": "Rain" },
    { "CityCode": "4930956", "CityName": "Boston", "Temp": "4.2", "Status": "Mist" },
    { "CityCode": "1796236", "CityName": "Shanghai", "Temp": "10.1", "Status": "Clouds" },
    { "CityCode": "3143244", "CityName": "Oslo", "Temp": "-3.9", "Status": "Clear" }
  ];
  weather_data_list: WeatherData[] = [];
  weather_data: WeatherData = new WeatherData();
  faPaperPlane = faPaperPlane;

  constructor(
    fb: FormBuilder,
    private dialog: MatDialog,
    private weather_data_service: WeatherDataService) {

    this.cityForm = fb.group({
      'city': new FormControl(null),
    });

    this.loadData();
  }

  ngOnInit(): void {

  }

  loadData() {
    var city_ids = this.cities.map(({ CityCode }) => CityCode);
    this.weather_data_service.getWeatherData(city_ids).subscribe((response: any) => {
      var data = response.list;
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

  btnAddCity(data: any) {
    console.log("Form Data", data);
    const dialogRef = this.dialog.open(DisplayComponent, { width: '40%', data: data.city, disableClose: true });
  }
}
