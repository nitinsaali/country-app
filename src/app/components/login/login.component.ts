import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { UserResponse } from '../../interfaces/user-response';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private correctCredentials: boolean;
  private submitted: boolean;
  private response: any;
  private customMsg: string;
  private customError: boolean;
  
  constructor(private router: Router, private authService: AuthenticationService) { 
    this.submitted = false;
    this.correctCredentials = false;
  }

  resetSubmit() {
    this.submitted = false;
    this.correctCredentials = false;
  }

  signIn(loginForm: NgForm) {
    this.authService.login(loginForm.value.email, loginForm.value.password)
    .subscribe((result : UserResponse) => {
      console.log("Got response from service:", result);
      if(result.success) {
        console.log("Login success.");
        this.router.navigate(['/country-list']);
      } else {
        this.submitted = true;
        this.customError = true;
        this.customMsg = result.message;
        console.log("Login failed.");
      }
    });
  
  }

}
