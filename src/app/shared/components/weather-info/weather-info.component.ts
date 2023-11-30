import { Component, Input } from '@angular/core';
import { IWeather } from 'src/app/core/services/weather.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss']
})
export class WeatherInfoComponent {

  @Input() weatherInfo: IWeather | null = {
    temperaturaActual: 0,
    descripcion: {
      texto: '',
      img: ''
    },
    precipitaciones: 0,
    pronostico: [],
    ciudad: ''
  };

}
