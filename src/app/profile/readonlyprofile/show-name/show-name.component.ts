import { Component, OnInit, NgModule, OnDestroy, Output,EventEmitter } from '@angular/core';
import { DataBaseService } from 'src/app/data-base.service';
import {User} from 'src/app/user.model'
import { Subscription, Subject } from 'rxjs';



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
  
  public buttonClickEventTrack = new Subject();
  click:boolean = true;
  editBtn:any
  data:any = {};
  subscription: Subscription;
  constructor(private dbService: DataBaseService) {
    this.subscription = this.dbService.sendUserData().subscribe(data =>{
      this.data = data
      
    })
  }
  btnClicked(){
    this.dbService.buttonClickTrack.next(this.click)
    console.log(this.click)
    this.editBtn = document.querySelector('#editBtn')
    if(this.click ===true&&this.editBtn.innerHTML =="Edytuj"){
      this.editBtn.innerHTML = 'Zapisz'
      this.click = false;
    }else{
      this.editBtn.innerHTML = 'Edytuj'
      this.click=true;
    }
    
  }

  ngOnInit() {
    
  }
  

}
