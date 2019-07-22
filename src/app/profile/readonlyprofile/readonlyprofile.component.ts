import { Component, OnInit, NgModule } from '@angular/core';
import { ShowNameComponent } from './show-name/show-name.component';
import { ShowOpinionComponent } from './show-opinion/show-opinion.component';
import { ShowPhotoComponent } from './show-photo/show-photo.component';
import { ShowTematicalModuleComponent } from './show-tematical-module/show-tematical-module.component';
import { ShowProfileEngineComponent } from './show-profile-engine/show-profile-engine.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UserComponent } from '../user.component';
import { DataBaseService } from 'src/app/data-base.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-readonlyprofile',
  templateUrl: './readonlyprofile.component.html',
  styleUrls: ['./readonlyprofile.component.scss']
})
@NgModule({
  declarations: [
    ShowNameComponent,
    ShowOpinionComponent,
    ShowPhotoComponent,
    ShowTematicalModuleComponent,
    ShowProfileEngineComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    DataBaseService
  ],
  exports: [
    ReadonlyprofileComponent
  ],
})
export class ReadonlyprofileComponent implements OnInit {
  actualUserKey: any;
  loggedUserKey = window.localStorage.getItem('loggedUserId')
  searchBtnClicked:any=false;
  id:any =this.activatedRoutes.snapshot.params['id'];
  constructor(private dbService: DataBaseService,
    private router:Router,
    private activatedRoutes:ActivatedRoute) {
    this.dbService.actualUserKey.subscribe(data => {
      this.actualUserKey = data
    })
    this.dbService.searchBtnClick.subscribe(data=>{
      this.searchBtnClicked = data
      
    })
  }
  ngOnInit() {
    if(this.id=== null|| this.id=== undefined) {
      this.showLoggedUser()
      this.searchBtnClicked = true;
    }else if(this.id !== null&&this.id !== undefined){
      this.showAnotherUser();
    }
  }
  showLoggedUser() {
    this.dbService.getUserData(this.loggedUserKey);
    this.dbService.arrayOfUserWhichGaveOpinion(this.loggedUserKey)
    this.dbService.getArrayOfThematicalModule(this.loggedUserKey); 
  }
  showAnotherUser() {
    this.dbService.getUserData(this.id);
    this.dbService.getArrayOfThematicalModule(this.id);
    this.dbService.arrayOfUserWhichGaveOpinion(this.id);
  }
}
