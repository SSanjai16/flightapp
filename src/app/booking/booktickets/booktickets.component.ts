import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { DataRequestService } from 'src/app/data-request.service';
import { Booking } from '../booking.model';
import { BookingService } from '../booking.service';
import { Moment } from 'moment';
import * as moment from 'moment';
import { AuthService } from 'src/app/auth.service';
import { Flight } from 'src/app/flight.model';
@Component({
  selector: 'app-booktickets',
  templateUrl: './booktickets.component.html',
  styleUrls: ['./booktickets.component.css']
})
export class BookticketsComponent implements OnInit {
  //@ViewChild('f') bform:NgForm;
  newroundbooking : Booking[];
  booking1 : Booking;
  booking2 : Booking;
  editedbookingindex:number;
  editedbooking:Booking;
  roundtripmode=false;
  defaultmeal="yes";
  defaultclass="business";
  
  defaultdate=new Date();
  
  tdate : string;
  constructor(private route:ActivatedRoute, private bookingservice : BookingService, private router:Router
    ,private datarequestservice : DataRequestService,private authservice: AuthService) { }
  flightid: number;
  flight : Flight;
  id : string='';
  userid : number=0;
  amount : number=0;
  validationstatus : string="valid";
  minvalue=moment(new Date()).format('YYYY-MM-DD');
  minreturnvalue=moment(new Date()).add(1,'days').format('YYYY-MM-DD');
  maxvalue=moment(new Date()).add(1,'months').format('YYYY-MM-DD');
  ngOnInit(): void {
    let isadmin=this.authservice.isadmin();
    console.log(isadmin);
   //console.log("book"+ad);
   
    this.route.params.subscribe((params:Params)=>
    {
      this.flightid=+params['flightnum'];
    });
    this.flight=this.bookingservice.getflightbasedonindex(this.flightid);
    

    // this.bookingservice.startedediting.subscribe(
    //   (index:number)=>{
    //     this.editedbookingindex=index;
    //     this.editmode=true;
    //     this.editedbooking=this.bookingservice.getbooking(index);
    //     this.bform.setValue({
    //       name:this.editedbooking.name ,
    //       amount:this.edit.amount
    //     })
    //     }
    // );
  
      
  }
  myFilter = (d: Date): boolean => {
    if(d!==null)
    {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    if(this.flight.daysoftravel==='weekdays')
    return day !== 0 && day !== 6;
    else if(this.flight.daysoftravel==='weekends')
    return day==0 || day==6;
    else if(this.flight.daysoftravel==='alldays')
    return true;
    }
    return false;

}
  onRoundtrip()
  {
    this.roundtripmode=true;
  }
  onOneway()
  {
    this.roundtripmode=false;
  }
  onSubmit(form : NgForm)
  {
    let user=sessionStorage.getItem('username');
    const value=form.value;
    console.log(value.date);
    this.tdate=value.date;
    value.date=moment(value.date).format('YYYY-MM-DD');
    if(this.roundtripmode!=true){
    const newbooking=new Booking(this.id,this.userid,user,this.flight.flightnumber,value.mealspref,value.bookingclass,value.numoftickets,value.amount,value.date,this.validationstatus,0);
    this.datarequestservice.storebooking(newbooking).subscribe(response =>
      {
        this.router.navigate(['../summary']);
      },
      error=>{
        this.router.navigate(['./login']);
    });
    }
    else if(this.roundtripmode===true)
    {
      let user=sessionStorage.getItem('username');
      console.log(value.startdate);
      console.log(value.returndate);
      value.startdate=moment(value.startdate).format('YYYY-MM-DD');
      value.returndate=moment(value.returndate).format('YYYY-MM-DD');
      this.booking1=new Booking(this.id,this.userid,user,this.flight.flightnumber,value.mealspref,value.bookingclass,value.numoftickets,value.amount,value.startdate,this.validationstatus,0);
      this.booking2=new Booking(this.id,this.userid,user,this.flight.flightnumber,value.mealspref,value.bookingclass,value.numoftickets,value.amount,value.returndate,this.validationstatus,0);
      //console.log(this.bookin)
      this.newroundbooking=[this.booking1,this.booking2];
      this.datarequestservice.storebookings(this.newroundbooking).subscribe(response =>
        {
          console.log("response");
          this.router.navigate(['../summary']);
        },
        error=>{
          this.router.navigate(['./login']);
      });
      }
    }
    
  
  onClear(form:NgForm)
  {
    form.reset();
  }

}
