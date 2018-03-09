import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';
import { UserResponse } from '../../interfaces/user-response';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private submitted: boolean;
  private passwordMismatch: boolean;
  private invalidEmail: boolean;
  private customError: boolean;
  public customMsg: string;

  constructor(private router: Router, private authService: AuthenticationService) { 
    this.submitted = false;
    this.passwordMismatch = false;
    this.invalidEmail = false;
    this.customError = false;
  }
  
  resetSubmit() {
    this.submitted = false;
    this.passwordMismatch = false;
    this.invalidEmail = false;
    this.customError = false;
  }

  register(registerForm: NgForm) {
    
    //check password and confirm password
    if(registerForm.value.password !== registerForm.value.cpassword) {
      this.submitted = true;
      this.passwordMismatch = true;
      return false;
    }
    
    //check email is valid
    let isValid = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(registerForm.value.email);  
    if(!isValid) {
      this.submitted = true;
      this.invalidEmail = true;
      return false;
    }
    
    this.authService.register(registerForm.value.email, registerForm.value.password)
    .subscribe((result : UserResponse) => {
      console.log("Got response from service:", result);
      if(result.success) {
        console.log("Registration success.");
        this.router.navigate(['/login']);
      } else {
        this.submitted = true;
        this.customError = true;
        this.customMsg = result.message;
        console.log("Registration failed.");
      }
    });
  }
}
