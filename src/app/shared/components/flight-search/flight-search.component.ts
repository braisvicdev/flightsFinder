import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { CityService, ICity } from 'src/app/shared/services/city.service';
import { FlightService, IFlight } from 'src/app/shared/services/flight.service';
import { UtilitiesService } from 'src/app/core/services/utilities.service';
import { IWeather, WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
  providers: [],
})
export class FlightSearchComponent implements OnInit, AfterViewInit {
  flightSearchForm!: FormGroup;
  minDateDeparture = new Date();
  maxDateDeparture!: Date | null;
  minDateReturn = new Date();

  worldCities: string[] = [];
  filteredOptionsOrigin: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  filteredOptionsDestination: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  flightsDeparture: IFlight[] = [];
  flightsReturn: IFlight[] = [];

  weatherInfo!: IWeather | null;

  gettingResults = false;
  showError = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder, private cityService: CityService,
    private flightService: FlightService,
    private weatherService: WeatherService,
    private utilitieService: UtilitiesService
  ) { }

  ngOnInit() {
    this.subscribeToCities();
    this.initializeForm();
    this.setupAutocomplete('origin');
    this.setupAutocomplete('destination');
  }


  ngAfterViewInit() {
    this.setupDateInput('departureDate');
    this.setupDateInput('returnDate');
  }

  private subscribeToCities() {
    this.cityService.getAll().subscribe(cities => {
      this.mapCities(cities.data);
    });
  }

  private mapCities(cities: ICity[]) {
    this.worldCities = [''];
    cities.forEach((element: ICity) => {
      if (element.city) {
        this.worldCities.push(element.city.toUpperCase());
      }
    });
  }

  private initializeForm() {
    this.flightSearchForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      departureDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  getFormControl(control: string): FormControl {
    return this.flightSearchForm.get(control) as FormControl;
  }

  private setupAutocomplete(controlName: string) {
    this.flightSearchForm.controls[controlName].valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      startWith(' '),
      map(value => this.filterCities(value, controlName))
    ).subscribe(filteredOptions => {
      if (controlName === 'origin') {
        this.filteredOptionsOrigin.next(filteredOptions);
      } else if (controlName === 'destination') {
        this.filteredOptionsDestination.next(filteredOptions);
      }
    });
  }

  private setupDateInput(controlName: string) {
    this.flightSearchForm.controls[controlName].valueChanges.subscribe(date => {
      const dateFormat = new Date(date);
      console.log(dateFormat);
      if (controlName === 'departureDate' && date) {
        this.minDateReturn = dateFormat;
      } else if (controlName === 'departureDate' && !date) {
        this.minDateReturn = new Date();
      }

      if (controlName === 'returnDate' && date) {
        this.maxDateDeparture = dateFormat;
      } else if (controlName === 'returnDate' && !date) {
        this.maxDateDeparture = null;
      }
    })
  }

  private filterCities(value: string, controlName: string): string[] {
    const filterValue = value.toLowerCase();
    return this.worldCities.filter(option => option.toLowerCase().includes(filterValue));
  }


  searchFlights() {
    if (this.flightSearchForm.valid) {
      const origin = this.flightSearchForm.value.origin;
      const destination = this.flightSearchForm.value.destination;
      const departureDate = this.utilitieService.formatDate(new Date(this.flightSearchForm.value.departureDate));
      const returnDate = this.utilitieService.formatDate(new Date(this.flightSearchForm.value.returnDate));

      this.gettingResults = true;
      this.showError = false;
      this.clearResults();
      this.flightService.getFlightsByParams(origin, destination, departureDate, returnDate).subscribe(data => {
        this.flightsDeparture = this.mapTravels(data[0]);
        this.flightsReturn = this.mapTravels(data[1]);
        this.gettingResults = false;
      },
        error => {
          this.flightsDeparture = [];
          this.flightsReturn = [];
          this.gettingResults = false;
          this.showError = true;
          if (error?.error) {
            this.errorMessage = error.error;
          } else {
            this.errorMessage = 'Ha ocurrido un error';
          }
        })
      this.weatherService.getWeatherByCity(destination, 5).subscribe(data => {
        this.weatherInfo = {
          ciudad: data.location.name,
          temperaturaActual: data.current.temp_c,
          descripcion: {
            texto: data.current.condition.text,
            img: data.current.condition.icon
          },
          precipitaciones: data.current.precip_mm,
          pronostico: data.forecast.forecastday
        }
      },
        error => {
          this.weatherInfo = null;
        })
    }
  }

  private mapTravels(travels: IFlight[]): IFlight[] {
    const travelsMap = travels.map(travel => {
      if (travel?.companyName && travel.companyName.length > 100) travel.companyName = '';
      const textoLimpio = travel.description.replace(/(Sale de|Llega a)/g, '');
      const arrayDeFrases = textoLimpio.split('. ')
      travel.leaveInfo = arrayDeFrases[0];
      travel.arriveInfo = arrayDeFrases[1];
      return travel;
    })
    return travelsMap;
  }


  private clearResults() {
    this.flightsDeparture = [];
    this.flightsReturn = [];
  }
}