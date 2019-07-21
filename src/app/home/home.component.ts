import { Component, OnInit } from '@angular/core';
import { DataBaseService, Friend } from '../data-base.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  myprofile=false;
  friend: Friend;
  userLogged:boolean
  btnClicked:boolean=false;
  constructor(private dbService: DataBaseService, private router: Router, public authService: AuthService) {
    this.dbService.searchBtnClick.subscribe(data=>{
      this.btnClicked = data
     
    })
   }
  ngOnInit() {
    this.friend = this.dbService.getRandomFriend();
    this.isUserLogged()

    this.dbService.searchBtnClick.next(this.btnClicked)
  }
  isUserLogged()//sprawdzenie czy użytkownik jest zalogowany jeśli tak to pokaż profil
  {
    if(this.dbService.loggedUserKey!=""){
      this.userLogged = true;
    }else{
      this.userLogged = false
    }
  }
  getFriend() {
    this.router.navigate(['/friends', this.friend.id]);
  }
  myProfile(){
    this.dbService.searchBtnClick.next(this.myProfile)
  }
}

