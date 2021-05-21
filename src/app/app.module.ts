import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { WeatherDataService } from './services/weather-data.service';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DisplayComponent } from './components/display/display.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DisplayComponent
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
  providers: [WeatherDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
