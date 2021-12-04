import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { BookingService } from '../booking/booking.service';
import { City } from '../city.model';
import { DailogService } from '../dailog.service';
import { DataRequestService } from '../data-request.service';
import { Flight } from '../flight.model';
import { Params } from '@angular/router';

@Component({
  selector: 'app-editflights',
  templateUrl: './editflights.component.html',
  styleUrls: ['./editflights.component.css']
})
export class EditflightsComponent implements OnInit {
  @ViewChild('f') slform:NgForm;
  editmode=false;
  businessclass=100;
  economyclass=100;
  error='';
  origin='';
  destination='';
  dayoftravel='';
  daysofflight='';
  weekdays:boolean=false;
  weekends:boolean=false;
  alldays:boolean=false;
  editeditem:Flight;
  flightid : number;
  flights : Flight[];
  cities:City[];
  constructor(private datarequestservice : DataRequestService , private bookingservice : BookingService
    ,private router : Router ,private dialogservice : DailogService,private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.bookingservice.bookingchanged.subscribe(
      (flights : Flight[])=>{
        this.flights=flights;
      }
    );
    this.datarequestservice.retrieveflights();
    this.flights=this.bookingservice.getflights();
    this.datarequestservice.getcities().subscribe(cities=>{
      this.cities=cities;

    });
    
  
}
onEditFlight(flight:Flight)
{
  this.dialogservice.openconfirmdialog("Are you sure you want to edit the flight?All the bookings will be invalid")
  .afterClosed().subscribe(res=>
    {
      if(res)
      {
        this.router.navigate(['./editflight/',flight.flightnumber]); 
//   this.editeditem=this.bookingservice.getflightinfo(i);
//   console.log("oneditflight" + this.editeditem.businessclass);
//   this.businessclass=this.editeditem.businessclass;
//   this.economyclass=this.editeditem.economyclass;
//   this.origin = this.editeditem.source;
//   this.destination = this.editeditem.destination;
//   //this.origin=this.editeditem.destination;
//   this.dayoftravel=this.editeditem.daysoftravel;
//   console.log(this.destination);
//   if(this.dayoftravel==="alldays")
//   { this.alldays=true;
//     console.log("working");
//   }
//   if(this.dayoftravel==="weekends")
//   {
//     this.weekends=true;
//   }
//   if(this.dayoftravel==="weekdays")
//   {
//     this.weekdays=true;
//   }
//   console.log(this.dayoftravel);
//   this.editmode=true;
 }
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
  }}
}

