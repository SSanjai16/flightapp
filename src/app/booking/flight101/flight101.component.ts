import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-flight101',
  templateUrl: './flight101.component.html',
  styleUrls: ['./flight101.component.css']
})
export class Flight101Component implements OnInit {

  flightnum=101;
  constructor(private router:Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
  }
  onBookTickets()
  {
    this.router.navigate(['../booking/',this.flightnum]);
  }}
  
