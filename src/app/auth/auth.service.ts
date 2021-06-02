import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  users = [{email : "sath@gmail.com", 
            password: "sath1996"},
            {email : "sesh@gmail.com",
            password : "sesh1962"}
          ];

  validateUser(email:String, password: String) {
    return this.users.some((user) => (user.email === email) && user.password === password);
  }

}

