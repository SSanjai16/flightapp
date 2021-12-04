import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { BookingService } from '../booking/booking.service';
import { City } from '../city.model';
import { DataRequestService } from '../data-request.service';
import { Flight } from '../flight.model';

@Component({
  selector: 'app-edit-the-flight',
  templateUrl: './edit-the-flight.component.html',
  styleUrls: ['./edit-the-flight.component.css']
})
export class EditTheFlightComponent implements OnInit {
  flightid:number;
  editeditem : Flight;
  cities:City[];
  constructor(private route : ActivatedRoute, private bookingservice : BookingService,private router : Router,private datarequestservice : DataRequestService) { }
  businessclass=0;
  economyclass=0;
  error='';
  origin='';
  destination='';
  dayoftravel='';
  daysofflight='';
  weekdays:boolean=false;
  weekends:boolean=false;
  alldays:boolean=false;
  
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>
    {
      this.flightid=+params['flightnum'];
      console.log("inside sub" + this.flightid);
      this.editeditem=this.bookingservice.getflightfromnum(this.flightid);
     }
    );
    
    this.datarequestservice.getcities().subscribe(cities=>{
      this.cities=cities;
      console.log("getcitysub ")
    });
    
    //this.editeditem=this.bookingservice.getflightinfo(this.flightid);
    //console.log("oneditflight" + this.editeditem.businessclass);
    this.businessclass=this.editeditem.businessclass;
    this.economyclass=this.editeditem.economyclass;
    this.origin = this.editeditem.source;
    this.destination = this.editeditem.destination;
    //this.origin=this.editeditem.destination;
    this.dayoftravel=this.editeditem.daysoftravel;
    console.log(this.destination);
    if(this.dayoftravel==="alldays")
    { this.alldays=true;
      console.log("working");
      this.daysofflight="alldays";
    }
    if(this.dayoftravel==="weekends")
    {
      this.weekends=true;
      this.daysofflight="weekends";
    }
    if(this.dayoftravel==="weekdays")
    {
      this.weekdays=true;
      this.daysofflight="weekdays";
    }
    console.log(this.dayoftravel);
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
      this.router.navigate(['./editflight']);
      this.error="same source and destination";
      console.log(this.error);
    }
    else
    {
    const newFlight=new Flight(this.editeditem.id,this.editeditem.flightnumber,value.businessclass,value.economyclass,value.source,value.destination,this.daysofflight);
    console.log("newflight");
    console.log(newFlight);
    this.datarequestservice.updateflight(newFlight).subscribe(response =>
      {
        console.log(response);
        this.router.navigate(['./booking']);
      },
      error=>{
        this.router.navigate(['./login']);
      });
  }
}



}
