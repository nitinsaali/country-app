import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
// Routing module
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { FavoriteDetailsComponent } from './components/favorite-details/favorite-details.component';

// services
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { CountryFetcherService } from './services/country-fetcher.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StartScreenComponent,
    CountryListComponent,
    CountryDetailsComponent,
    FavoriteDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAM9BL_OdSLpn460K_0qZjszP_rdkBbzUo'
    })
  ],
  providers: [AuthenticationService, CountryFetcherService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
