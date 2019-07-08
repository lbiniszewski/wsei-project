import { Component, OnInit, NgModule } from '@angular/core';
import { ShowNameComponent } from './show-name/show-name.component';
import { ShowOpinionComponent } from './show-opinion/show-opinion.component';
import { ShowPhotoComponent } from './show-photo/show-photo.component';
import { ShowTematicalModuleComponent } from './show-tematical-module/show-tematical-module.component';
import { ShowProfileEngineComponent } from './show-profile-engine/show-profile-engine.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UserComponent } from '../user.component';

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

  constructor() { }
  
  ngOnInit() {
  }

}
