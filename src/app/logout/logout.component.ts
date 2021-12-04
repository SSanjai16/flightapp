import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authservice: AuthService , private router : Router) { }

  ngOnInit(): void {
    //this.authservice.logout();
    console.log("logging out");
    this.authservice.logout().subscribe(response=>{
      this.router.navigate(['login']);
    })
    
  }

}
