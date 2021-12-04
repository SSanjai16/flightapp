import { EventEmitter, Injectable } from '@angular/core';
import { City } from './city.model';
import { DataRequestService } from './data-request.service';
import { Flight } from './flight.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  cityselected = new EventEmitter<City>();
  flightfromcity=new EventEmitter<Flight[]>();
  city:City;
  flight : Flight[];
  constructor(private datarequestservice : DataRequestService) { }
  oncityselected(city : City)
  {
    this.city=city;
    this.cityselected.emit(this.city);
  }
  getflightfromcity(city : City)
{
    this.datarequestservice.getflightsfromcity(city).subscribe((flight: Flight[])=>{
        this.flight=flight;
        this.flightfromcity.emit(this.flight);
    });
}
}
