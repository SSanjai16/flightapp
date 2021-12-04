import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-flight102',
  templateUrl: './flight102.component.html',
  styleUrls: ['./flight102.component.css']
})
export class Flight102Component implements OnInit {
  flightnum=102;
  constructor(private router:Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
  }
  onBookTickets()
  {
    //console.log("lo");
    this.router.navigate(['../booking/',this.flightnum]);
    //console.log("hello");
  }

}
