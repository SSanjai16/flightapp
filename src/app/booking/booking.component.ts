import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataRequestService } from '../data-request.service';
import { Flight } from '../flight.model';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: []
})
export class BookingComponent implements OnInit {

  constructor(private router:Router, private route : ActivatedRoute, private datarequestservice : DataRequestService,
    private bookingservice : BookingService) { }
  flights: Flight[]; 
  flightnum : number;
  bookcomponent = true;
  isloading=false;
  bookflight101 = false;
  bookflight102= false;
  ngOnInit(): void {
    //this.flights=
    this.bookcomponent=false;
    this.isloading=true;
    this.bookingservice.flightschanged.subscribe(
      (flights : Flight[])=>{
        this.flights=flights;
        this.isloading=false;
      }
    );
    this.datarequestservice.retrieveflights();
    this.bookingservice.getflights();
    //this.isloading=false;
  }
  
  /*onBookFlight101()
  {
    
    this.bookflight101=true;
    console.log(this.bookflight101);
  }
  onBookFlight102()
  {
    
    this.bookflight102=true;
    console.log(this.bookflight101);
  }*/
  onflightselect(i : number)
  {
    //this.router.navigate([]);
    this.flightnum=this.flights[i].flightnumber;
    this.bookcomponent=true;
 
    this.router.navigate(['./booking/',i]);
    this.router.navigate(['.',i],{relativeTo:this.route});
  }
  onFlight101()
  {
    this.router.navigate(['flight-101'],{ relativeTo :this.route});
    //console.log("hi");
    this.bookflight101=true;
  }
  onFlight102()
  {
    this.router.navigate(['flight-102'],{relativeTo :this.route});
    this.bookflight102=true;
  }

}
