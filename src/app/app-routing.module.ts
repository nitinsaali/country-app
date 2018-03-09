import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { FavoriteDetailsComponent } from './components/favorite-details/favorite-details.component';

const routes: Routes = [
  {
    path: 'start-screen',
    component: StartScreenComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'country-list',
    component: CountryListComponent,
  },
  {
    path: 'country-details/:name',
    component: CountryDetailsComponent,
  },
  {
    path: 'favorite-details',
    component: FavoriteDetailsComponent,
  },
  {
    path: '',
    redirectTo: 'start-screen',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: StartScreenComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
