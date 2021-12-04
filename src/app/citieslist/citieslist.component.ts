import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '../city.model';
import { CityService } from '../city.service';
import { DataRequestService } from '../data-request.service';

@Component({
  selector: 'app-citieslist',
  templateUrl: './citieslist.component.html',
  styleUrls: ['./citieslist.component.css']
})
export class CitieslistComponent implements OnInit {
  @Output() cityclicked=new EventEmitter<City>();
  constructor(private datarequestservice : DataRequestService, private router : Router,private cityservice : CityService){}
  cities:City[];
  // cities:City[]=[{
  //      cityname:'chennai'
  //   },{
  //      cityname:'bangalore'
  //    }];
  isselected :boolean=false;
  isloading=false;
  selectedcity  :City;
  ngOnInit(): void {
    this.isloading=true;
    this.datarequestservice.getcities().subscribe(cities=>{
      this.cities=cities;
      this.isloading=false;

    });
  }
  onSelect(city : City)
  {
    this.isselected=true;
    this.selectedcity=city;
    //this.cityservice.oncityselected(this.selectedcity);
    //this.cityclicked.emit(city);
    this.cityservice.getflightfromcity(this.selectedcity);
    


  }

}
