import { TestBed, inject } from '@angular/core/testing';

import { CountryFetcherService } from './country-fetcher.service';

describe('CountryFetcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountryFetcherService]
    });
  });

  it('should be created', inject([CountryFetcherService], (service: CountryFetcherService) => {
    expect(service).toBeTruthy();
  }));
});
