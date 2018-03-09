import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CountryFetcherService } from '../../services/country-fetcher.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Country } from '../../interfaces/country';
@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
  public currentCountry: Country;
  public favorite : boolean;

  constructor(private router: Router, private route: ActivatedRoute, 
    private countryFetcherService: CountryFetcherService,
    private authService: AuthenticationService) { 
    this.favorite = false;  
  }

  ngOnInit() {
    const countryName = this.route.snapshot.paramMap.get('name');

    this.countryFetcherService.getCountry(countryName)
      .subscribe((country) => {
        this.currentCountry = country;  
    })
    let loggedUser = JSON.parse(this.authService.getLoggedInUser());
    
    let count = loggedUser.favorites.filter(x => x == this.currentCountry.name).length;
    if(count > 0) {
      this.favorite = true;
    } 
  }

  toggle() {
   this.favorite = !this.favorite;
   this.authService.setFavorites(this.currentCountry.name, this.favorite);
  }
}
