import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, take, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IFlight {
  thumbnail: string;
  companyName: string;
  description: string;
  leaveInfo: string;
  arriveInfo: string;
  duration: string;
  airportLeave: string;
  airportArrive: string;
  layover: string;
  emissions: string;
  price: string;
  priceDescription: string;
}


@Injectable({
  providedIn: 'root'
})
export class FlightService {
  BASE_URL = environment.api_flights_url;


  constructor(private http: HttpClient) { }


  getFlightsByParams(origin: string, destination: string, departureDate: string, returnDate: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}?origin=${origin}&destination=${destination}&departureDate=${departureDate}&returnDate=${returnDate}`).pipe(
      map(data => {
        data[0] = data[0].slice(0, environment.limit_flight_list);
        data[1] = data[1].slice(0, environment.limit_flight_list);
        return data;
      }),
      catchError((error) => {
        return throwError(error.error);
      })
    )
  }
  
}

