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
    
  ],
  exports: [
    ReadonlyprofileComponent
  ],
})
export class ReadonlyprofileComponent implements OnInit {
  
  btnClicked:boolean=false;
  constructor(private dbService:DataBaseService) { 
    this.dbService.searchBtnClick.subscribe(data=>{
      this.btnClicked = data
      console.log(this.btnClicked)
    })
  }
  ngOnInit() {
    if(this.btnClicked===false){
      
      this.showActualUser()
    }else if(this.btnClicked===true){
      
      this.showAnotherUser()
      
    }
    
  }
  showActualUser(){
    this.dbService.getUserData(this.dbService.loggedUserKey);
      this.dbService.getArrayOfThematicalModule(this.dbService.loggedUserKey);
      this.dbService.arrayOfUserWhichGaveOpinion(this.dbService.loggedUserKey)
  }
  showAnotherUser(){
    this.dbService.getUserData(this.dbService.actualUserKey);
      this.dbService.getArrayOfThematicalModule(this.dbService.actualUserKey);
      this.dbService.arrayOfUserWhichGaveOpinion(this.dbService.actualUserKey);
      
  }
 
}
  