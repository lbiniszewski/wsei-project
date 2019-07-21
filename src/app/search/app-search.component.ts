import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { DataBaseService } from '../data-base.service';
import { Router } from '@angular/router';
import { ReadonlyprofileComponent } from '../profile/readonlyprofile/readonlyprofile.component';

@Component({
  selector: 'app-app-search',
  templateUrl: './app-search.component.html',
  styleUrls: ['./app-search.component.scss']
})
export class AppSearchComponent implements OnInit,AfterContentChecked{
  click:boolean = true;
  searchBtnValue:any;
  constructor(private dbService:DataBaseService,
    private readOnlyProfComponent:ReadonlyprofileComponent
    ) { 
  }
  getUser(){
   
    this.dbService.searchBtnClick.next(this.click)
    
    this.dbService.database.collection('users').get().toPromise().then(snapshot=>{
      snapshot.forEach(data=>{
        if(this.searchBtnValue.value == data.data().userName){
        this.dbService.actualUserKey.next(data.id)
        this.readOnlyProfComponent.ngOnInit()
        
        }
        
      })
    })
    
  }
  ngOnInit() {
  }
  ngAfterContentChecked(){
    
    this.searchBtnValue = document.querySelector('.searchInput')
  }
  
}

