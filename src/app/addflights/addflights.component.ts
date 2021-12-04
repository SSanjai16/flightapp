import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataRequestService } from '../data-request.service';
import { Flight } from '../flight.model';
import {City } from '../city.model';
@Component({
  selector: 'app-addflights',
  templateUrl: './addflights.component.html',
  styleUrls: ['./addflights.component.css']
})
export class AddflightsComponent implements OnInit {
id:number;
error='';
cities:City[]=[];
  
daysofflight="alldays";
  constructor(private router : Router , private datarequestservice : DataRequestService) { }

  ngOnInit(): void {
    this.id =0;
    this.datarequestservice.getcities().subscribe(cities=>{
      this.cities=cities;
    } 
    );

  }
  onalldays()
  {
    this.daysofflight="alldays";
  }
    onweekdays()
    {
      this.daysofflight="weekdays";
    }
  onweekends()
  {
    this.daysofflight="weekends";
  }
  onSubmitformf(form : NgForm)
  {
    const value=form.value;
    if(value.source===value.destination)
    {
      this.router.navigate(['./addflight']);
      this.error="same source and destination";
      console.log(this.error);
    }
    else
    {
    console.log(value.source);
    const newFlight=new Flight('',value.flightnumber,value.businessclass,value.economyclass,value.source,value.destination,this.daysofflight);
    console.log(newFlight);
    this.datarequestservice.storeflight(newFlight).subscribe(response =>
      {
        console.log(response);
        this.router.navigate(['./booking']);
      });
    }
  }
}
