import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

export interface IWeather {
  ciudad: string,
  temperaturaActual: number,
  descripcion: {
    texto: string,
    img: string,
  },
  precipitaciones: number,
  pronostico: []
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  BASE_URL = environment.api_weather_url;

  constructor(private http: HttpClient) { }

  getWeatherByCity(city: string, days: number): Observable<any> {
    city = city.replace('ñ', 'n');
    return this.http.get<any>(`${this.BASE_URL}?q=${city}&days=${days}&key=${environment.api_key_weather}&lang=es`).pipe(
      catchError((error) => {
        return throwError(error);
      })
    )
  }
}
