import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  
})
@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
