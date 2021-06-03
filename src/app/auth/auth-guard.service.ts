import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, RouterState } from '@angular/router'
import { AuthenticationService } from './auth.service'

@Injectable()
export class LoginDetailsAuthenticationGuard  {
    constructor(private authenticationService: AuthenticationService, private router: Router) {}
    
    // canActivate() : boolean {
    //     if(this.authenticationService.userValidated) {
    //         this.router.navigate(["toDo"]);
           
    //     } else {
    //         alert("User not logged in/ user credentials incorrect");
    //       //  this.router.navigate([""]);
           
    //     }
    //     return this.authenticationService.userValidated;
    // }
    
    canActivate() : boolean {
        return this.authenticationService.userValidated;
    }
    
}