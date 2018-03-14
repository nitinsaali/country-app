import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, BehaviorSubject, Subscription } from "rxjs/Rx";
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  public favoritesCount: number;
  constructor(private router: Router, private location: Location, authService: AuthenticationService) {
    
    // this.favoritesCount = authService.favoritesCount;
    // authService.setFavorites.subscribe((value) => { 
    //   this.favoritesCount = value; 
    // });
    //this.favoritesCount = authService.getFavoritesCount();
  }

  ngOnInit() {
      
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
