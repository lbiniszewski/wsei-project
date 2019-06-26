import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FriendsComponent } from './friends/friends.component';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app.routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DataBaseService } from './data-base.service';
import { FriendDetailComponent } from './friends/friend-detail/friend-detail.component';
import { FriendsListComponent } from './friends/friends-list/friends-list.component';
import { TemplateDrivenFormComponent } from './about/template-driven-form/template-driven-form.component';
import { ReactiveFormComponent } from './about/reactive-form/reactive-form.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAdjxXGTP8DeaHj7We_qGBZeyr3PLZOd3U",
  authDomain: "web-portfolio-513ae.firebaseapp.com",
  databaseURL: "https://web-portfolio-513ae.firebaseio.com",
  projectId: "web-portfolio-513ae",
  storageBucket: "",
  messagingSenderId: "176788400650",
  appId: "1:176788400650:web:e13388e0e33524e5"
};





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FriendsComponent,
    AboutComponent,
    PageNotFoundComponent,
    FriendDetailComponent,
    FriendsListComponent,
    TemplateDrivenFormComponent,
    ReactiveFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [DataBaseService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
