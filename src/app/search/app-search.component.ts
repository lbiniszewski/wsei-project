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
    console.log(this.click)
    this.dbService.searchBtnClick.next(this.click)
    console.log(this.searchBtnValue.value)
    this.dbService.database.collection('users').get().toPromise().then(snapshot=>{
      snapshot.forEach(data=>{
        if(this.searchBtnValue.value == data.data().userName){
        window.localStorage.setItem('actualUserKey',data.id)
        this.readOnlyProfComponent.ngOnInit()
        console.log(this.dbService.searchBtnClick)
        console.log(data.id,data.data())
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

