import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

/** Checks if user has appropriate permissions to view pages and handles redirection if not */
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {

    let url = '/' + route.url.toString();
    console.log("Halt! Who goes there?");
    let loggedInUser = this.authService.getLoggedInUser();
    
    let loggedIn;
    if(loggedInUser == null) {
        loggedIn = false;
    } else {
        loggedIn = true;
    }
    //console.log(url);
    if(url == "/login" || url == "/start-screen" || url == "/register") {
      if(loggedIn) {
        console.log("You are already logged in. Redirecting...");
        this.router.navigate(['/country-list']);
        return false;    
      } else {
        console.log("Welcome! Please log in.");
        return true; //since everyone has access to these pages
      }
    } else {
      if(loggedIn) {
        return true;
      } else { 
        console.log("You need to be logged in to view this page! Redirecting you to login...");
        //redirect to login
        this.router.navigate(['/login']);
        return false;
      }
    }
  }
}
