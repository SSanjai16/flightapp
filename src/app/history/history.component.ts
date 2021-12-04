import { OnChanges, Component, ElementRef, NgZone, OnInit, ViewChild,HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from '../booking/booking.model';
import { BookingService } from '../booking/booking.service';
import { DataRequestService } from '../data-request.service';
import { Flight } from '../flight.model';
import { NgForm } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import {DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {fromEvent, Subject } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Length } from '../length.model';


@Component({
  selector: 'app-history', 
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{
  selectedclass='null';
  selectedmeal='null';
  selectedvalid='null';
  p:number=1;
  bookings: Booking[]=[];
  flights : Flight[]=[];
  isloading=false;
  length:number;
  size:number;
  index:number;
  valuehighlight='';
  value='';
  greaterthan2=false;
  isTableHasData = true;
  isclientsearch=false;
  isShow: boolean;
  isfirstpage: boolean;
  itemsdisplayed: number;
  islastpage: boolean;
  topPosToStartShowing = 50;
  displayedColumns: string[] = ['userid', 'name', 'flight','meals','travelclass','tickets','amount','dateofbooking','validationstatus'];
  //dataSource:any;
  dataSource:MatTableDataSource<Booking>;
  private subjectkeyup=new Subject<any>();
  @ViewChild(MatSort, {static : true} ) sort: MatSort;
  
  @ViewChild(MatPaginator,{static : true}) paginator : MatPaginator;
  constructor(private bookingservice:BookingService, private datarequestservice : DataRequestService
    ,private router : Router) { }
    
  ngOnInit(): void {
    this.greaterthan2=true;
    this.size=50;
    this.index=1;
    this.isfirstpage=true;
    this.itemsdisplayed=this.index*this.size;
    this.isloading=true;
    this.isfirstpage=(this.index===1)?true:false;
    this.datarequestservice.getbookingsforpastpage(this.index-1,this.size).subscribe(bookings=>{
      if(bookings.length>0)
      {
      this.bookings=bookings;
      this.length=bookings[0].bookinglength;
      console.log("lengthofbookings "+this.length); 
      this.dataSource = new MatTableDataSource(this.bookings);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort;
      this.isloading=false; 
      this.dataSource.paginator=this.paginator;
      this.isfirstpage=(this.index===1)?true:false;
      console.log(this.isfirstpage);
      this.itemsdisplayed=this.index*this.size;
      console.log(this.itemsdisplayed);
      this.islastpage=(this.itemsdisplayed<this.length)?false:true;
      }
      else
      {
        this.isloading=false;
        this.bookings=[];
        this.isTableHasData=false;
        this.length=0;
      }

},
error=>{
  this.router.navigate(['./login']);
});
    this.subjectkeyup.pipe(debounceTime(1000)).subscribe((search)=>
    {
      console.log(search);
      this.searchfilter(search);
    });
 
  }
  // ngAfterViewInit() {
  //   this.dataSource.paginator=this.paginator;
  //   this.dataSource.sort = this.sort;
  //     }
      @HostListener('window:scroll')
  checkScroll() {
   const scrollPosition =document.documentElement.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true; 
    } else {
      this.isShow = false;
    }
  }
  scrollToTop() {
    window.scrollTo(0,0);
    
  }
  paginate(event:any)
  {
    if(this.valuehighlight==='' && this.selectedclass==='null' && this.selectedmeal==='null' && this.selectedvalid==='null')
    {
      this.datarequestservice.getbookingsforpastpage(event-1,50).subscribe(
        (bookings : Booking[])=>{
            this.bookings=bookings;
            console.log(this.bookings);
            //this.dataSource=this.bookings;
            this.dataSource = new MatTableDataSource(this.bookings);
            this.dataSource.paginator=this.paginator;
            this.dataSource.sort = this.sort;
            this.index=event;
            this.isfirstpage=(this.index===0)?true:false;
            console.log(this.isfirstpage);
            this.itemsdisplayed=this.index*this.size;
            console.log(this.itemsdisplayed);
            this.islastpage=(this.itemsdisplayed<this.length)?false:true;
        });
    }
    else
    {
    console.log(event);
    this.index=event;
    // this.dataSource = new MatTableDataSource(this.bookings); 
    this.dataSource = new MatTableDataSource(this.bookings.slice(event * this.size - this.size, event * this.size));
    this.dataSource.sort = this.sort;
    this.isfirstpage=(this.index===0)?true:false;
    console.log(this.isfirstpage);
    this.itemsdisplayed=this.index*this.size;
    console.log(this.itemsdisplayed);
     this.islastpage=(this.itemsdisplayed<this.length)?true:false;
  }
  }
  onsubmit(form : NgForm)
  {
    const value=form.value;
    this.isloading=true;
    console.log(value.flightsearch);
    console.log(value);
    this.datarequestservice.retrievesearchflight(value.flightsearch).subscribe(bookings=>{
      this.bookingservice.setBookings(bookings);
      this.isloading=false;
  });
  form.reset();
}
applyFilter(event)
{
 
  this.value=(event.target as HTMLInputElement).value;
  this.subjectkeyup.next(this.value);
}
searchfilter(filtervalue : string)
{
  if(filtervalue.length!==0 && filtervalue.length<2)
  {
    this.greaterthan2=false;
  }
  else if(filtervalue.length==0)
  {
    this.value='';
    this.isloading=true;
    this.greaterthan2=true;
    this.valuehighlight='';
    this.datarequestservice.search(this.valuehighlight,this.selectedclass,this.selectedvalid,this.selectedmeal).subscribe((bookings:Booking[])=>{
      this.bookings=bookings;
      this.length=this.bookings.length;
      console.log(this.bookings);
      this.dataSource = new MatTableDataSource(this.bookings);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator=this.paginator;
      if(this.bookings.length>0)
      {
        this.isTableHasData = true;
      }  
      else{
        this.isTableHasData = true;
      }
      this.isloading=false;
    });
  }
  else{
    this.greaterthan2=true; 
  this.valuehighlight=filtervalue;
  this.dataSource.filter= this.valuehighlight.trim().toLowerCase();
  if(this.dataSource.filteredData.length > 0){
    this.isTableHasData = true;
  } else {
    this.isTableHasData = false;
  }
  this.isclientsearch=true;
}
}
onPaginateChange(event){
  console.log(event.pageSize);
 
  if(this.valuehighlight===(''))
  {
    this.isloading=true;
    console.log("empty search");
    console.log("pageindex "+event.pageIndex);
  this.datarequestservice.getbookingsforpastpage(event.pageIndex,event.pageSize).subscribe(
    (bookings : Booking[])=>{
        this.bookings=bookings;
        console.log(this.bookings);
        this.dataSource = new MatTableDataSource(this.bookings);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator=this.paginator;
        this.index=event.pageIndex;
        this.size=event.pageSize;
        console.log(this.size);
        console.log(this.index);
        this.isloading=false;
        //this.changeDetection.detectChanges();
        //this.cdr.detectChanges();
    });
  }
  else
  {
    this.dataSource = new MatTableDataSource(this.bookings); 
    this.dataSource.paginator=this.paginator;   
    this.dataSource.sort = this.sort;
  }
   
}
onselectclass(value:string)
{
  this.isloading=true;
  this.datarequestservice.search(this.valuehighlight,this.selectedclass,this.selectedvalid,this.selectedmeal).subscribe((bookings:Booking[])=>{
    this.bookings=bookings;
    console.log(this.bookings);
    this.dataSource = new MatTableDataSource(this.bookings);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator=this.paginator;
    this.length=this.bookings.length;
    if(this.bookings.length>0) 
    {
      this.isTableHasData = true;
    }  
    else{
      this.isTableHasData = true;
    }
    this.isloading=false;
  });
}
searchmore()
{
  console.log("searched");
  this.isloading=true;
  this.isclientsearch=false;
   this.datarequestservice.search(this.valuehighlight,this.selectedclass,this.selectedvalid,this.selectedmeal).subscribe((bookings:Booking[])=>{
    this.bookings=bookings;
    console.log(this.bookings);
    this.dataSource = new MatTableDataSource(this.bookings);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator=this.paginator;
    this.length=this.bookings.length;
    if(this.bookings.length>0) 
    {
      this.isTableHasData = true;
    }  
    else{
      this.isTableHasData = true;
    }
    this.isloading=false;
  });
}

}
