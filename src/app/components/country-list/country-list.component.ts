import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CountryFetcherService } from '../../services/country-fetcher.service'
import { Country } from '../../interfaces/country';

//ignore warnings for jQuery selector
declare var $: any;

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit, AfterViewInit {
  public countriesToDisplay: Country[];
  public countries: Country[];
  public countryNames: Object[];

  constructor(private countryFetcherService: CountryFetcherService) { }

  ngOnInit() {
    this.countries = this.countryFetcherService.getCountries();

    //sepearted bcoz to add pagination in near future
    this.countriesToDisplay = this.countryFetcherService.getCountries();
    
    /**
     * This is to get countries in required format in order to populate in dropdown  
     */
    this.countryNames = [];
    for(let con in this.countries) {
      this.countryNames.push({ 
        value: this.countries[con].name,
        name: this.countries[con].name
      });
    }
  }
 
  ngAfterViewInit() {
    var self = this;
    $('select').selectize({
      options:this.countryNames,
			labelField: 'name',
      searchField: ['name'],
      onChange: function(value) {
        self.showOnlySearchResults(value);
      }
    });
  }

  showOnlySearchResults(value: string) {
    let con;
    for(con in this.countries) {
      if(this.countries[con].name == value) break;
    }
    if(this.countries[con].name != value) {
      this.countriesToDisplay = this.countries;
    } else {
      //only display this country
      this.countriesToDisplay = []
      this.countriesToDisplay[0] = this.countries[con];
    }
  }

  
}
