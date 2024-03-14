import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title: string = "Appli Météo";
  temp?: number;
  city?: string;
  apiUrl!: string;
  data: any;
  icon?: string;
  description?: string;
  cityQuery?: string;

  apiKey?: string = "b8df448240231f34717c9858bdb2536d";

  constructor(private httpClient: HttpClient) {
    this.apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Paris,fr&lang=fr&units=metric&appid=" + this.apiKey;

    // console.log(this.httpClient.get(this.apiUrl));
    this.getMeteo();
  }


  async getWeatherLocation(){
    // recupere coords GPS
    let coords = await Geolocation.getCurrentPosition();
    console.log(coords);
    // modifier l'url avec lat/lon
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.coords.latitude}&lon=${coords.coords.longitude}&lang=fr&units=metric&appid=${this.apiKey}`;
    // console.log(url);

    // envoi de la requête
    this.readApi(url).subscribe((data) => {
      this.data = data;
      console.log(this.data);
      this.city = this.data.name;
      this.temp = Math.round(this.data.main.temp);
      this.icon = this.data.weather[0].icon;
      this.description = this.data.weather[0].description
    })
    // mise en forme data
  }

  async getMeteo() {
    

    console.log(this.cityQuery);
    this.readApi(this.apiUrl).subscribe((data) => {
      this.data = data;
      console.log(this.data);
      this.city = this.data.name;
      this.temp = Math.round(this.data.main.temp);
      this.icon = this.data.weather[0].icon;
      this.description = this.data.weather[0].description
    })
  }

  weatherQuery() {

    this.apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityQuery}&lang=fr&units=metric&appid=b8df448240231f34717c9858bdb2536d`;

    this.getMeteo();
  }

  readApi(url: string) {
    return this.httpClient.get(url);
  }
  

}
