import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  city : string = '';
  myWeather : Weather ;

  constructor(private http : Http, private navController: NavController) { //dependency injection
    this.city = "banglore";
    this.myWeather = new Weather(this.city);
  }

    getWeather() {
      var url = 'http://api.openweathermap.org/data/2.5/weather?q='+this.city+'&APPID=0fd26da88d01aaf64ffb3785a4e80c8a';
        var response = this.http.get(url)
          .map(res => res.json())
          .subscribe(data  => {
            console.log(data);
            this.myWeather.city = this.city;
            this.myWeather.temp = data.main.temp - 273; //to celcius
            this.myWeather.pressure = data.main.pressure;
            this.myWeather.humidity = data.main.humidity;
            console.log(this.myWeather)
          });
        return response;
    }

}

class Weather{
  _city : string ;
  _temp : number;
  _humidity : number;
  _pressure : number ;
  constructor(city){

  }

  get city(){
    return this._city;
  }
  set city(city){
    this._city = city
  }
  get temp(){
    return this._temp;
  }
  set temp(temp){
    this._temp = temp
  }
  get humidity(){
    return this._humidity;
  }
  set humidity(humidity){
    this._humidity = humidity
  }
  get pressure(){
    return this._pressure;
  }
  set pressure(pressure){
    this._pressure = pressure
  }
}
