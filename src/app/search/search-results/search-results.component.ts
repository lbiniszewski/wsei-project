import { Component, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/data-base.service';
import { Router } from '@angular/router';
import { ReadonlyprofileComponent } from 'src/app/profile/readonlyprofile/readonlyprofile.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  loggedUserKey= window.localStorage.getItem('loggedUserId')
  searchInputValue:any
  userMatchArray = []
  click:boolean = true
  actualUserKey:any;
  constructor(private dbService:DataBaseService,
    private router:Router,
    private readOnlyProfComponent: ReadonlyprofileComponent) { 
    this.dbService.searchInputValue.subscribe(data=>{
      this.searchInputValue = data
      this.getFriendsArray()
    })
  }
  getFriendsArray(){

    this.dbService.database.collection('users').get().toPromise().then(snapshot=>{
      snapshot.forEach(doc=>{
        if(doc.data().userName == this.searchInputValue){
          let newObj = {
            key:doc.id,
            name:doc.data().userName,
            surname:doc.data().surname,
            photo:doc.data().userPhoto

          }
          this.userMatchArray.push(newObj)
        }
      })
    })
  }
  showUserProfile(key:any){
    this.actualUserKey = key
    this.dbService.actualUserKey.next(this.actualUserKey)
    this.dbService.searchBtnClick.next(this.click)
  }
  ngOnInit() {
  }
  
}
