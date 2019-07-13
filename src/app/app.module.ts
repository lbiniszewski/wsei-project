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
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { NavbarModule, WavesModule, ButtonsModule, InputsModule } from 'angular-bootstrap-md';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppSearchComponent } from './search/app-search.component';
import { ReadonlyprofileComponent } from './profile/readonlyprofile/readonlyprofile.component';
import { ShowProfileEngineComponent } from './profile/readonlyprofile/show-profile-engine/show-profile-engine.component';
import { ShowPhotoComponent } from './profile/readonlyprofile/show-photo/show-photo.component';
import { ShowNameComponent } from './profile/readonlyprofile/show-name/show-name.component';
import { ShowOpinionComponent } from './profile/readonlyprofile/show-opinion/show-opinion.component';
import { ShowTematicalModuleComponent } from './profile/readonlyprofile/show-tematical-module/show-tematical-module.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { EditProfileEngineComponent } from './profile/edit-profile/edit-profile-engine/edit-profile-engine.component';
import { TextFieldComponent } from './profile/edit-profile/text-field/text-field.component';
import { AddButtonComponent } from './profile/edit-profile/add-button/add-button.component';
import { CancleButtonComponent } from './profile/edit-profile/cancle-button/cancle-button.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import * as rxjs from 'rxjs';
import { HttpClientModule } from "@angular/common/http";
import { ImageCropperModule } from 'ngx-image-cropper';





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
    LoginComponent,
    AppSearchComponent,
    ReadonlyprofileComponent,
    ShowProfileEngineComponent,
    ShowPhotoComponent,
    ShowNameComponent,
    ShowOpinionComponent,
    ShowTematicalModuleComponent,
    EditProfileComponent,
    EditProfileEngineComponent,
    TextFieldComponent,
    AddButtonComponent,
    CancleButtonComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    MDBBootstrapModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    HttpClientModule,
    ImageCropperModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [DataBaseService, AuthService],
  bootstrap: [AppComponent]
})



export class AppModule {}
