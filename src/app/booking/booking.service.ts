import { BookingComponent } from "./booking.component";
import { Booking } from"./booking.model";
import { EventEmitter, Injectable } from "@angular/core";
//import { DataRequestService } from "../data-request.service";
import { Flight } from "../flight.model";
import { City } from "../city.model";

@Injectable()
export class BookingService{
   bookingchanged=new EventEmitter<Booking[]>();
   flightschanged=new EventEmitter<Flight[]>();
   flightfromcity=new EventEmitter<Flight[]>();
   //startedediting =new EventEmitter<number>();

    // private bookings:Booking[]=[
    //     new Booking('Sanjai',101,'yes','Economic',2),
    //     new Booking('Sanju',101,'no','Business',2)
    // ];
    private bookings: Booking[]=[];
    private flights: Flight[]=[];
    private flight : Flight[];
    constructor(){}
    setBookings(bookings : Booking[])
{
    this.bookings=bookings;
    this.bookingchanged.emit(this.bookings);
}
setflights(flights:Flight[])
{
    this.flights=flights;
    this.flightschanged.emit(this.flights);
}

addbooking(booking: Booking)
{
    this.bookings.push(booking);
    //this.bookings.emit(this.bookings.slice());
    //console.log(this.bookings);
}
getbookings()
{
    return this.bookings.slice();
}
getflights()
{
    return this.flights.slice();
}
deleteBooking(index : number)
{
    //console.log(this.bookings[index]);
    //this.datarequest.deletebooking(this.bookings[index].name); 
    //this.bookingschanged.emit =   
     this.bookings.splice(index,1);
     
    //console.log(this.bookings);

    this.bookingchanged.emit(this.bookings);
}
getbooking(index : number)
{
    return this.bookings[index];
}
getflight(index : number)
{
    console.log(this.flights[index].id);
    return this.flights[index].id;
}
getflightbasedonindex(index : number)
{
    return this.flights[index];
}
getflightinfo(index:number)
{
    console.log("getflightinfo ");
    return this.flights[index];
}
getflightfromnum(flightnum : number)
{
    console.log("getflightfromnum");
    for(let flight of this.flights)
    {
        if(flight.flightnumber===flightnum)
        {
            return flight;
        }
    }
}

}

