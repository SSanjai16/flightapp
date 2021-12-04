import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  id:number;
  error:string=null;
  constructor(private authservice : AuthService , private router : Router) { }

  ngOnInit(): void {
    this.id=0;
  }
  onsubmit(form : NgForm)
  {
    const value=form.value;
    const newuser =new User(this.id,value.username,value.email,value.password);
    //console.log(newuser);
    this.authservice.storeuser(newuser).subscribe(response=>{
     // console.log(response);
      this.router.navigate(['./login']);
    },
    error=>{
        //console.log(error.message);
        this.error="Account already exists/invalid";
    });
  }
  onlogin(event : Event)
  {
    this.router.navigate(['./login']);
  }


}
