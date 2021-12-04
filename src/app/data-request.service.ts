import { Injectable } from "@angular/core";
import {HttpClient,HttpParams} from '@angular/common/http';
import { BookingService } from "./booking/booking.service";
import { Booking } from "./booking/booking.model";

import { Router } from "@angular/router";
import { Flight } from "./flight.model";
import { Form, MaxLengthValidator } from "@angular/forms";
import { City } from "./city.model";
import { Length } from "./length.model";
import { User } from "./user.model";

@Injectable()
export class DataRequestService
{
      bookings : Booking[];
    constructor(private http : HttpClient , private bookingservice : BookingService, private router : Router)
    {

    }
    storebooking(booking: Booking)
    {
           return this.http.post('http://localhost:8007/airplane/webapi/flight-app/flight',booking);
    }
    storebookings(bookings:Booking[])
    {
        console.log(bookings);
        return this.http.post('http://localhost:8007/airplane/webapi/flight-app/roundflight',bookings);
    }
    storeflight(flight : Flight)
    {   
        console.log(flight);
        return this.http.post('http://localhost:8007/airplane/webapi/flight-app/manageflights',flight);
    }
    updateflight(flight : Flight)
    {
        return this.http.post('http://localhost:8007/airplane/webapi/flight-app/editflight',flight); 
    }
    retrievebookings()
    {
         this.http.get<Booking[]>('http://localhost:8007/airplane/webapi/flight-app/booking').subscribe(bookings=>{
            this.bookingservice.setBookings(bookings);
        },
        error=>{
            this.router.navigate(['./login']);
        }
        );
    }
    
    retrieveflights()
    {
        return this.http.get<Flight[]>('http://localhost:8007/airplane/webapi/flight-app/manageflightsdata').subscribe(flights=>
        {this.bookingservice.setflights(flights)},
        error=>{
            this.router.navigate(['./login']);
        });
    }

    retrievepastbookings()
    {
        this.http.get<Booking[]>('http://localhost:8007/airplane/webapi/flight-app/pastbooking').subscribe(bookings=>{
            this.bookingservice.setBookings(bookings);
    },
    error=>{
        this.router.navigate(['./login']);
    }
    
    );
}
retrievepastbooking()
    {
        return this.http.get<Booking[]>('http://localhost:8007/airplane/webapi/flight-app/pastbooking');
    }
    deletebooking(booking : Booking)
    {
        //let name=this.bookings[id];
        //name="/"+name;
        //console.log(name);
        return this.http.post('http://localhost:8007/airplane/webapi/flight-app/deletebooking',booking); 
        //.subscribe(response=>
          //  {console.log(response);}
        //);
    }
    deleteflight(i : string)
    {
        return this.http.delete('http://localhost:8007/airplane/webapi/flight-app/manageflights'+'/'+i);
    }
    retrievesearchflight(flightnum:number )
    {   
        return this.http.get<Booking[]>('http://localhost:8007/airplane/webapi/flight-app/searchflight'+'/'+flightnum);
    }
    getcities()
    {
        return this.http.get<City[]>('http://localhost:8007/airplane/webapi/flight-app/cities');
    }
    getflightsfromcity(city : City)
    {
        console.log("getflightfromcity "+city);
        return this.http.post<Flight[]>('http://localhost:8007/airplane/webapi/flight-app/getflightfromcity',city);
    }
    addcity(newcity: City) {
        console.log("addcity " +newcity);
        return this.http.post<City>('http://localhost:8007/airplane/webapi/flight-app/addcity',newcity);
    }
    
    getbookingsforpastpage(page : number,pagesize  :number)
    {
        let searchparams = new HttpParams();
        searchparams = searchparams.append('pageindex', page.toString());
        searchparams = searchparams.append('pagesize', pagesize.toString());
        return this.http.get<Booking[]>('http://localhost:8007/airplane/webapi/flight-app/getpastbookingsfrompage',{
            params: searchparams
            }
        );
    }
    getbookingsforpresentpage(page : number,pagesize  :number)
    {
        let searchparams = new HttpParams();
        searchparams = searchparams.append('pageindex', page.toString());
        searchparams = searchparams.append('pagesize', pagesize.toString());
        return this.http.get<Booking[]>('http://localhost:8007/airplane/webapi/flight-app/getpresentbookingsfrompage',{
            params: searchparams
            }
        ); 
    }
    getlength()
    {
        return this.http.get('http://localhost:8007/airplane/webapi/flight-app/getlengthofpastbooking');
    }
    search(searchterm : string,searchclass : string,searchvalid : string,searchmeal : string)
    {let searchparams = new HttpParams();
        searchparams = searchparams.append('searchterm',searchterm);
        searchparams = searchparams.append('searchclass',searchclass)
        searchparams = searchparams.append('searchvalid',searchvalid)
        searchparams = searchparams.append('searchmeal',searchmeal) 
        return this.http.get<Booking[]>('http://localhost:8007/airplane/webapi/flight-app/pastsearch',{
            params: searchparams
            }
        );
    }
    presentsearch(searchterm : string,searchclass : string,searchvalid : string,searchmeal : string)
    {let searchparams = new HttpParams();
        searchparams = searchparams.append('searchterm',searchterm);
        if(searchclass!=='null')
        searchparams = searchparams.append('searchclass',searchclass)
        if(searchvalid!=='null')
        searchparams = searchparams.append('searchvalid',searchvalid)
        if(searchmeal!=='null')
        searchparams = searchparams.append('searchmeal',searchmeal) 
        return this.http.get<Booking[]>('http://localhost:8007/airplane/webapi/flight-app/presentsearch',{
            params: searchparams
            }
        );
    }
    getallusers()
    {
        //return this.http.get('http://localhost:8007/airplane/webapi/user/allusers');   
        return this.http.get<User[]>('http://localhost:8007/airplane/webapi/user/allusers');
    }

    
} 