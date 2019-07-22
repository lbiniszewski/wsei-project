import { Component, OnInit } from '@angular/core';
import { DataBaseService, Friend } from '../data-base.service';
import { DomSanitizer} from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit  {
  arrayOfFriends= [];
  actualUserKey:any;
  click:boolean = true
  constructor(private dbService:DataBaseService,
    ){
    this.getFirendArray()

  }
  ngOnInit(){
  }
  getFirendArray(){
    this.dbService.database.collection('users').doc(this.dbService.loggedUserKey).collection('friends').get().toPromise().then(snapshot=>{
      snapshot.forEach(doc=>{
        this.dbService.database.collection('users').get().toPromise().then(snapshot2=>{
          snapshot2.forEach(doc2=>{
            if(doc.id == doc2.id){
              let newObj = {
                key:doc.id,
                name:doc2.data().userName,
                surname:doc2.data().surname,
                photo:doc2.data().userPhoto,
              }
              this.arrayOfFriends.push(newObj)
            }
          })
        })
      })
    })
  }
  removeFriend(key:string){
    this.arrayOfFriends.forEach(user=>{

      this.dbService.database.collection('users').doc(this.dbService.loggedUserKey).collection('friends').doc(key).delete()
    })
    this.arrayOfFriends= [];
    this.getFirendArray()
  }
  showUserProfile(key:any){
    this.actualUserKey = key
    this.dbService.actualUserKey.next(this.actualUserKey)
     this.dbService.searchBtnClick.next(this.click)
  }
}

