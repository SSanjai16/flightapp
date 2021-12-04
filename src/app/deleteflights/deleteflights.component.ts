import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../booking/booking.service';
import { DailogService } from '../dailog.service';
import { DataRequestService } from '../data-request.service';
import { Flight } from '../flight.model';

@Component({
  selector: 'app-deleteflights',
  templateUrl: './deleteflights.component.html',
  styleUrls: ['./deleteflights.component.css']
})
export class DeleteflightsComponent implements OnInit {
  flights : Flight[];
  constructor(private datarequestservice : DataRequestService , private bookingservice : BookingService
    ,private router : Router,private dialogservice : DailogService) { }

  ngOnInit(): void {
    this.bookingservice.bookingchanged.subscribe(
      (flights : Flight[])=>{
        this.flights=flights;
      }
    );
    this.datarequestservice.retrieveflights();
    this.flights=this.bookingservice.getflights();
    console.log(this.flights);

  }
  ondeleteflight(i : number)
  {

    // this.datarequestservice.deleteflight(this.bookingservice.getflight(i)).subscribe(response=>
    //   {
    //     //this.router.navigate(['../booking']);
    //     this.router.navigate(['../summary']);
    //     //this.bookings=this.bookingservice.getbookings;
    //     this.datarequestservice.retrieveflights();
    //   },
    //   error=>{
    //     this.router.navigate(['./login']);
    //   }
      
    // );
    this.dialogservice.openconfirmdialog("Are you sure you want to delete the flight?")
    .afterClosed().subscribe(res=>
      {
        if(res)
        {
          this.datarequestservice.deleteflight(this.bookingservice.getflight(i)).subscribe(response=>
              {
                this.router.navigate(['../summary']);
                this.datarequestservice.retrieveflights();
            },
            error=>{
            this.router.navigate(['./login']);
            }
      
            );
        }
      });
      
    
  }
  
}
