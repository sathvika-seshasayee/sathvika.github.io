import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) {}
  
  ngOnInit(): void {  
  }

    onSubmit(form: NgForm) {
        if(this.authenticationService.validateUser(form.value.email, form.value.password)) {
          this.router.navigate(["toDo"]);
        } else {
          alert("Incorrect user name and password");
        }
    }
  }

