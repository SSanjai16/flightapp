import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable()
export class AuthService
{
    valid: boolean=false;
    constructor(private http : HttpClient ,  private router : Router){}
    // authenticate(username, password) {
    //     const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    //     console.log(headers);
    //     return this.http.post<User>('http://localhost:8007/airplane/webapi/user/login',{headers}).pipe(
    //      map(userData => {
    //             sessionStorage.setItem('username', username);
    //             return userData;
    //         })
    
    //     );
    //   }
      isuserloggedin()
      {
          let user=sessionStorage.getItem('username');
          return!(user===null);
      }
    
    storeuser(user : User)
    {
        return this.http.post('http://localhost:8007/airplane/webapi/user/register',user);
    }
    checklogin(user : User)
    {
        console.log(user);
        this.http.post<User>('http://localhost:8007/airplane/webapi/user/login',user).pipe(
            map(user=>{
                sessionStorage.setItem('username',user.username);
                return true;
                }
                )
        );
        return false;
        
    }
    checklog(user:User)
    {
         
        sessionStorage.removeItem('username');
        console.log(user);
        return this.http.post('http://localhost:8007/airplane/webapi/user/login',user);
    }
    isloggedin()
    {
        let username=localStorage.getItem('token');
        return !(username===null);
    }
    logout()
    {
        localStorage.removeItem('token'); 
        return this.http.get('http://localhost:8007/airplane/webapi/user/logout');
    }
    gettoken()
    {
        return localStorage.getItem('token');
    }
    isadmin()
    {
        let jwt = localStorage.getItem('token');

let jwtData = jwt.split('.')[1]
let decodedJwtJsonData = window.atob(jwtData)
let decodedJwtData = JSON.parse(decodedJwtJsonData)

let name=decodedJwtData.username;

//console.log('jwtData: ' + jwtData)
//console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
//console.log('decodedJwtData: ' + decodedJwtData)
//console.log('Is admin: ' + name);
if(name==='admin')
return true;
else
return false;
    }
} 