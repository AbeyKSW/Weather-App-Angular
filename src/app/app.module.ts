import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WeatherService } from './services/weather.service';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { WeatherHomeComponent } from './components/weather-home/weather-home.component';
import { WeatherCityComponent } from './components/weather-city/weather-city.component';
import { HttpInterceptorService } from 'http-Interceptor.service';
import { ErrorHandlerService } from 'error-handler.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherHomeComponent,
    WeatherCityComponent,
    WeatherCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule
  ],
  providers: [
    WeatherService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: ErrorHandler, useClass:ErrorHandlerService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
