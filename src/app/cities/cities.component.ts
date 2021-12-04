import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from '../city.model';
import { CityService } from '../city.service';
import { DataRequestService } from '../data-request.service';
import { Flight } from '../flight.model';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  cities:City[]=[{
    cityname:'chennai'
  },{
    cityname:'bangalore'
  }];
  clickedcity : City;   
  addcity=true;
  isloading=false;
 //cities:City[];
 flights:Flight[];
  // flights:Flight[]=[
  //   {
  //     id:1,
  //     flightnumber:101,
  //     businessclass:200,
  //     economyclass:200,
  //     source:'chennai',
  //     destination:'bangalore',
  //     daysoftravel:'alldays'
  //   },

  // ];
  isselected :boolean=false;
  selectedcity  :City;
  constructor(private datarequestservice : DataRequestService, private router : Router,private cityservice : CityService) { }
  cityselected =false;
  ngOnInit(): void {
    this.addcity=false;
    this.isloading=true;
    this.cityservice.cityselected.subscribe(
      (city:City)=>{
        this.cityselected=true;
      }
    )
    // this.datarequestservice.getcities().subscribe(cities=>{
    //   this.cities=cities;
    //   this.isloading=false;
    // });

  }
  childcityClicked(city : City)
  {
    this.clickedcity=city;
    console.log(this.clickedcity.cityname);
    //this.clickedcity=event;
  }
  onSelect(city : City)
  {
    this.isloading=true;
    this.isselected=true;
    this.selectedcity=city;
    console.log(this.selectedcity);
    this.datarequestservice.getflightsfromcity(city).subscribe(flights=>{
      this.flights=flights;
      this.isloading=false;
    }

    );

  }
  onselect(flight : Flight)
  {
    console.log(flight.flightnumber);
    this.router.navigate(['./editflight/',flight.flightnumber]);
  }
  onaddcity()
  {
    this.addcity=!this.addcity;
  }
  onSubmit(form:NgForm)
  {
    const value=form.value;
    const newcity=new City(value.city);
    console.log(value.city);
    this.datarequestservice.addcity(newcity).subscribe(
      response =>
      {
        console.log(response);
        this.router.navigate(['./summary']);
      }
    );
  }

}
