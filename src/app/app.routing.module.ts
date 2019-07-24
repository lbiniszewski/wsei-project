import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FriendsComponent } from './friends/friends.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { RegisterComponent } from './auth/login/register/register.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { ReadonlyprofileComponent } from './profile/readonlyprofile/readonlyprofile.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'friends',
    component: FriendsComponent,
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'search',
    component: SearchResultsComponent
  },
  {
    path:'home/readOnProf/:id',
    component:ReadonlyprofileComponent,
  },
  {
    path:'search/readOnProf/:id',
    component:ReadonlyprofileComponent
  },
  {
    path:'friends/readOnProf/:id',
    component:ReadonlyprofileComponent
  },
  //dodanie sciezki do routingu, podstrona jaka bedzie sie wczytywala jak klikniemy guzik edit
  {
    path: 'profile/edit-profile',
    component: EditProfileComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

