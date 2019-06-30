import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FriendsComponent } from './friends/friends.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FriendDetailComponent } from './friends/friend-detail/friend-detail.component';
import { FriendsListComponent } from './friends/friends-list/friends-list.component';
import { LoginComponent } from './auth/login/login.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';

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
    children: [
      {
        path: '', // www.example.pl/friends/
        component: FriendsListComponent
      },
      {
        path: ':id', // www.example.pl/friends/1
        component: FriendDetailComponent
      }
    ]
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
    path: '**',
    component: PageNotFoundComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

