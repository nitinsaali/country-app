import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
/* Interfaces */
import { Country } from '../interfaces/country';
/* Services */
import { countries } from './countries';
@Injectable()
export class CountryFetcherService {
  countries = countries;
  
  constructor() { }

  getCountries(): Country[] {
    return this.countries;
  }

  getCountry(name: string): Observable<Country> {
    return of(this.countries.find(country => country.name === name));
  }
}
