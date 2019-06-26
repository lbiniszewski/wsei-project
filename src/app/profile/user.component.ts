import { Component, OnInit, NgModule } from '@angular/core';
import { ReadonlyprofileComponent } from './readonlyprofile/readonlyprofile.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  
})
@NgModule({
  declarations: [
    ReadonlyprofileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReadonlyprofileComponent
  ],
  providers: [],
  exports:[
    UserComponent
  ]
  
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
