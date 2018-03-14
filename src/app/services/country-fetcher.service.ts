import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
/* Interfaces */
import { Country } from '../interfaces/country';
/* Services */
// import { countries } from './countries';
@Injectable()
export class CountryFetcherService {

  public HOST_NAME_API : string = 'https://restcountries.eu/rest';
  public CONFIG_VERSION : string = 'v2';
  public countries: Observable<Country[]>;
  
  constructor(private http: HttpClient) { }
  

  getCountries(): Observable<Country[]> {
    this.countries = this.http.get<Country[]>(`${this.HOST_NAME_API}/${this.CONFIG_VERSION}/name/united`)
    return this.countries;
  }

  getCountry(code: string): Observable<Country> {
    //return this.countries.map(countries => countries.find(country => country.alpha3Code == code));
    return this.getCountries().map(countries => countries.find(country => country.alpha3Code == code));
  }
}
