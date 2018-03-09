import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  public favoritesCount: number;
  constructor(private router: Router, private location: Location) {
    
      if(this.location.path() != '/register' || this.location.path() != '/start-screen') {
        let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if(currentUser == null) {
          this.router.navigate(['/login']);
        }
        this.favoritesCount = 0;
    }
  }

  ngOnInit() {

  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
