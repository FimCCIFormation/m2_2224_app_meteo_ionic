import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title:string = "Appli Météo";
  temp?:number;
  city?:string;
  apiUrl!:string;
  data:any;
  icon?:string;
  description?:string;

  constructor(private httpClient:HttpClient) {
    this.apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=saint-lo&lang=fr&units=metric&appid=";

    // console.log(this.httpClient.get(this.apiUrl));
    this.getMeteo();
  }

  async getMeteo(){
    this.readApi(this.apiUrl).subscribe((data) => {
      this.data = data;
      console.log(this.data);
      this.city = this.data.name;
      this.temp = Math.round(this.data.main.temp);
      this.icon = this.data.weather[0].icon;
      this.description = this.data.weather[0].description
    })
  }

  readApi(url:string){
    return this.httpClient.get(url);
  }

}
