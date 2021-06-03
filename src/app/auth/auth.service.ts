import { Injectable } from '@angular/core';
import { LoginDetailsAuthenticationGuard } from './auth-guard.service';
import { CanActivate, Router, ActivatedRoute, RouterState, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Iuser } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private router: Router) { }

  users:Iuser[] = [{email : "sath@gmail.com", 
            password: "sath1996"},
            {email : "sesh@gmail.com",
            password : "sesh1962"}
          ];

   userValidated:boolean = false;

  validateUser(email:String, password: String) {
     this.userValidated =  this.users.some((user) => (user.email === email) && user.password === password);
     if(this.userValidated) {
       console.log(this.userValidated);
      this.router.navigate(["toDo"]); 
  } else {
      alert("User not logged in/ user credentials incorrect");
      this.router.navigate([""]); 
  }
    }
  
}

