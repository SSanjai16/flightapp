import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  e: string=null;
  invalidLogin=true;
  token:string;

  constructor(private router : Router , private authservice : AuthService) { }

  ngOnInit(): void {
    sessionStorage.removeItem('username');
    localStorage.removeItem('token');
  }
  // onsubmit(form : NgForm ) {
  //   const value=form.value;
  //   this.authservice.authenticate(value.username, value.password).subscribe(
  //     data => {
  //       this.router.navigate([''])
  //       this.invalidLogin = false
  //     },
  //     error => {
  //       this.invalidLogin = true

  //     }
  //   );
  // }
  onsubmit(form : NgForm)
  {
    const value=form.value;
    const loginuser=new User(0,value.username,"",value.password);
    this.authservice.checklog(loginuser).subscribe((response:any)=>{
      
      this.token=response['token']; 
      sessionStorage.setItem('username',value.username);
      localStorage.setItem('token',response.token);
      //console.log("booking");
      this.router.navigate(['./booking']);
  },
   error=>{
     this.e="Invalid Credentials";
     console.log(this.e);
     
   }
  );
  
}

  
  onregister(event : Event)
  {
    this.router.navigate(['./register']);
  }
   }
