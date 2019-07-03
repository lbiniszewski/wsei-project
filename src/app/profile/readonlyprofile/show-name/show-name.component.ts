import { Component, OnInit, NgModule, OnDestroy } from '@angular/core';
import { DataBaseService } from 'src/app/data-base.service';
import {User} from 'src/app/user.model'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-show-name',
  templateUrl: './show-name.component.html',
  styleUrls: ['./show-name.component.scss']
})
@NgModule({
  exports:[
    ShowNameComponent,
  ],
  imports:[
    DataBaseService
  ]
})
export class ShowNameComponent implements OnInit {
  data:any = {};
  subscription: Subscription;
  constructor(private dbService: DataBaseService) {
    this.subscription = this.dbService.sendUserData().subscribe(data =>{
      this.data = data
      
    })
    
  }
  ngOnInit() {
    
    
  }
  

}
