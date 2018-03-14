import { Component, OnInit } from '@angular/core';
import { CountryFetcherService } from '../../services/country-fetcher.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-favorite-details',
  templateUrl: './favorite-details.component.html',
  styleUrls: ['./favorite-details.component.css']
})
export class FavoriteDetailsComponent implements OnInit {
  public countries: Country[];
  public favorite : boolean;
  public favoritesArr: string[];
  constructor(private countryFetcherService: CountryFetcherService, private authService: AuthenticationService) { }

  ngOnInit() {
    
    this.countryFetcherService.getCountries()
      .subscribe((countries) => {
        this.countries = countries;
    })
    let loggedUser = JSON.parse(this.authService.getLoggedInUser());
    
    this.favoritesArr = loggedUser.favorites;
  }
  
  toggleFavorites(countryCode) {
    let favorite;
    let count = this.favoritesArr.filter(item => item == countryCode).length;
    if(count == 0) {
      favorite = true;
      this.favoritesArr.push(countryCode);
    } else {
      favorite = false;
      var index = this.favoritesArr.indexOf(countryCode);
      this.favoritesArr.splice(index, 1);
    }

    this.authService.setFavorites(countryCode, favorite);
   }
}
