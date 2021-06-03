import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, RouterState } from '@angular/router'
import { LoginDetailsAuthenticationGuard } from '../auth-guard.service';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router,
              private loginGuard: LoginDetailsAuthenticationGuard) {}
  
  ngOnInit(): void {  
  }

    onSubmit(form: NgForm) {
      this.authenticationService.validateUser(form.value.email, form.value.password);
  }

     // onSubmit(form: NgForm) {
    //     this.authenticationService.validateUser(form.value.email, form.value.password)) {
    //       this.router.navigate(["toDo"]);
    //     } else {
    //       alert("Incorrect user name and password");
    //     }
    // }
    
}

