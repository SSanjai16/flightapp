import { AfterViewInit, Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { BookingService } from '../booking/booking.service';
import {Booking} from '../booking/booking.model';
import { DataRequestService } from '../data-request.service';
import { Router } from '@angular/router';
import { Flight } from '../flight.model';
import {DOCUMENT } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  providers: []
})
export class SummaryComponent implements OnInit,AfterViewInit {
  selectedclass='null';
  selectedmeal='null';
  selectedvalid='null';
  bookings: Booking[];
  flights : Flight[];
  isloading=false;
  isShow: boolean;
  istablehasdata=true;
  valuehighlight='';
  value='';
  index:number;
  size:number;
  topPosToStartShowing = 50;
  length : number;
  isTableHasData = true;
  greaterthan2=true;
  isclientsearch=false;
  isfirstpage: boolean;
  itemsdisplayed: number;
  islastpage: boolean;
  displayedColumns: string[] = ['userid', 'name', 'flight','meals','travelclass','tickets','amount','dateofbooking','validationstatus','actions'];
  dataSource:MatTableDataSource<Booking>;
  private subjectkeyup=new Subject<any>();
  @ViewChild(MatSort, {static : true} ) sort: MatSort;
  @ViewChild(MatPaginator,{static : true}) paginator : MatPaginator;
  constructor(private bookingservice:BookingService, private datarequestservice : DataRequestService
    ,private router : Router) { }

  ngOnInit(): void {
    this.isloading=true;
    this.bookings=[];
    this.size=50;
    this.index=1;
    this.isfirstpage=(this.index===1)?true:false;
    console.log(this.isfirstpage);
    this.datarequestservice.getbookingsforpresentpage(this.index-1,this.size).subscribe(bookings=>{
      // if(bookings.length>0)
      // {
      // this.bookings=bookings; 
      // this.length=bookings[0].bookinglength;
      // console.log("lengthofbookings "+this.length); 
      // this.dataSource = new MatTableDataSource(this.bookings);
      // this.isloading=false; 
      // //this.dataSource =new MatTableDataSource(this.bookings);
      // this.dataSource.sort = this.sort;
      // this.dataSource.paginator=this.paginator;
      // }
      // else
      // {
      //   this.isloading=false;
      //   this.bookings=[];
      //   this.isTableHasData=false;
      //   this.length=0;
      // }
      if(bookings.length>0)
      {
      this.bookings=bookings;
      console.log(bookings);
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
    //this.flights=this.bookingservice.getflights();
    //console.log(this.bookings[0].name);
  }
  ngAfterViewInit() {
    //if(this.paginator!=undefined)
    //this.dataSource.paginator=this.paginator;
    }
    paginate(event:any)
    {
      if(this.valuehighlight==='' && this.selectedclass==='null' && this.selectedmeal==='null' && this.selectedvalid==='null')
      {
        this.datarequestservice.getbookingsforpresentpage(event-1,50).subscribe(
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
    searchfilter(filtervalue : string)
{
  //const filtervalue=(event.target as HTMLInputElement).value;
  if(filtervalue.length!==0 && filtervalue.length<2)
  {
    this.greaterthan2=false;
  }
  else if(filtervalue.length==0)
  {
    this.greaterthan2=true;
    this.isloading=true;
    this.datarequestservice.getbookingsforpresentpage(0,2).subscribe((bookings:Booking[])=>{
      this.bookings=bookings;
      this.length=this.bookings[0].bookinglength;
      console.log(this.bookings);
      this.dataSource = new MatTableDataSource(this.bookings);
      this.dataSource.sort = this.sort;
      this.index=0;
      this.size=2;
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
  console.log(event);
  if(this.valuehighlight==='' && this.selectedclass==='null' && this.selectedmeal==='null' && this.selectedvalid==='null')
  {
  this.isloading=true;
  this.datarequestservice.getbookingsforpresentpage(event.pageIndex,event.pageSize).subscribe(
    (bookings : Booking[])=>{
        this.bookings=bookings;
        console.log(this.bookings);
        this.dataSource = new MatTableDataSource(this.bookings); 
        this.dataSource.paginator=this.paginator;   
        this.dataSource.sort = this.sort;
        this.index=event.pageIndex;
        this.length=this.bookings[0].bookinglength;
        this.size=event.pageSize;
        console.log(this.size);
        console.log(this.index);
        this.isloading=false;
    });
  }
  else
  {
    this.dataSource = new MatTableDataSource(this.bookings); 
    this.dataSource.paginator=this.paginator;   
    this.dataSource.sort = this.sort;
  }
}


  applyFilter(event)
{ 
   this.value=(event.target as HTMLInputElement).value;
   this.subjectkeyup.next(this.value);
}
  onDeleteBooking(index : number)
  {
    let i=this.paginator.pageIndex > 0? index + this.paginator.pageIndex * this.paginator.pageSize: index;
    console.log("deleting index"+i);
    this.datarequestservice.deletebooking(this.bookingservice.getbooking(i)).subscribe(response=>
      {
        this.router.navigate(['../summary']);
        //this.bookings=this.bookingservice.getbookings;
        this.datarequestservice.retrievebookings();
      },
      error=>{
        this.router.navigate(['./login']);
      }
      
    );
    
  }
  onPastBooking()
  {
    this.datarequestservice.retrievepastbookings();
    this.bookings=this.bookingservice.getbookings();
  }
  onselectoption(value:string)
{
  this.isloading=true;
  this.datarequestservice.presentsearch(this.valuehighlight,this.selectedclass,this.selectedvalid,this.selectedmeal).subscribe((bookings:Booking[])=>{
    this.bookings=bookings;
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
  searchmore()
{
  this.isloading=true;
  console.log("searched");
  this.isclientsearch=false;
   this.datarequestservice.presentsearch(this.valuehighlight,'','','').subscribe((bookings:Booking[])=>{
    this.bookings=bookings;
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

  
}
 