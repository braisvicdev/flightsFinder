import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ICity {
  city: string;
  country: string;
  populationCounts: { year: string; value: string; sex: string; reliability: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class CityService {
  BASE_URL = environment.api_city_url;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.BASE_URL)
  }
}