import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '../city.model';
import { CityService } from '../city.service';
import { DailogService } from '../dailog.service';
import { DataRequestService } from '../data-request.service';
import { Flight } from '../flight.model';

@Component({
  selector: 'app-flightformcity',
  templateUrl: './flightformcity.component.html',
  styleUrls: ['./flightformcity.component.css']
})
export class FlightformcityComponent implements OnChanges {
  citynew : City;
  flights : Flight[];
  isloading = false;
  isselect=true;
  flightsavailable:boolean;
  //@Input() cityselected : City;
  //  flights:Flight[]=[
  //   {
  //     id:1,
  //     flightnumber:101,
  //     businessclass:200,
  //     economyclass:200,
  //     source:'chennai',
  //     destination:'bangalore',
  //     daysoftravel:'alldays'
  //   },
  //   {
  //     id:1,
  //     flightnumber:101,
  //     businessclass:200,
  //     economyclass:200,
  //     source:'chennai',
  //     destination:'bangalore',
  //     daysoftravel:'alldays'
  //   }

  // ];
  constructor(private cityservice : CityService,private datarequestservice : DataRequestService ,private router : Router) {
    //this.isloading=true;
    this.cityservice.flightfromcity.subscribe((flights : Flight[])=>{
      this.isselect=true;
      this.flights=flights;
      console.log("hello");
      this.isloading=false;
      this.flightsavailable=true;
    })
   }

  ngOnIt()
  {
    //this.isloading=true;
    console.log("isloading");
    this.isselect=false;
    this.flightsavailable=false;
  }
  ngOnChanges(): void {
    
    // if(this.cityselected!==null)
    // {
    //   console.log("flightfromcity "+this.cityselected.cityname);
    //   this.isloading=true;
    //   this.datarequestservice.getflightsfromcity(this.cityselected).subscribe(flights=>{
       
    //     this.flights=flights;
    //     console.log(this.flights[0].flightnumber);
    //     this.isloading=false;
    //   }
    //   );
    // }   
  }
  onselect(flight : Flight)
  {
    console.log(flight.flightnumber);
    this.router.navigate(['./editflight/',flight.flightnumber]);
  }

}
