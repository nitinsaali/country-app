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
    this.countries = this.countryFetcherService.getCountries();

    let loggedUser = JSON.parse(this.authService.getLoggedInUser());
    
    this.favoritesArr = loggedUser.favorites;
    console.log(loggedUser.favorites);
  }
  
  toggleFavorites(countryName) {
    console.log(countryName);
    let favorite;
    let count = this.favoritesArr.filter(item => item == countryName).length;
    if(count == 0) {
      favorite = true;
      this.favoritesArr.push(countryName);
    } else {
      favorite = false;
      var index = this.favoritesArr.indexOf(countryName);
      this.favoritesArr.splice(index, 1);
    }

    this.authService.setFavorites(countryName, favorite);
   }
}
