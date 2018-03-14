import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

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
    canActivate: [ AuthGuard ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'country-list',
    component: CountryListComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'country-details/:code',
    component: CountryDetailsComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'favorite-details',
    component: FavoriteDetailsComponent,
    canActivate: [ AuthGuard ]
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
