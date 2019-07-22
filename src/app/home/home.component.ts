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


  friend: Friend;
  userLogged:boolean
  constructor(private dbService: DataBaseService, private router: Router, public authService: AuthService) {
    
   }
  ngOnInit() {
    this.friend = this.dbService.getRandomFriend();
    this.isUserLogged()
    
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
}

