import { Component, Input } from '@angular/core';
import { IFlight } from 'src/app/shared/services/flight.service';

@Component({
  selector: 'app-flights-details',
  templateUrl: './flights-details.component.html',
  styleUrls: ['./flights-details.component.scss']
})
export class FlightsDetailsComponent {
  @Input() departureFlights: IFlight [] = [];
  @Input() arriveFlights: IFlight [] = [];

}
