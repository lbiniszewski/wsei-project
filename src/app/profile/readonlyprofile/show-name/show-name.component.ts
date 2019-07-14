//import { Component, OnInit, NgModule, Input } from '@angular/core';
// import { AuthService } from 'src/app/auth/auth.service';
// import { Router } from '@angular/router';
// import { DataBaseService, Friend } from 'src/app/data-base.service';
// import * as firebase from 'firebase';
// import { Observable } from 'rxjs';
// import { map, take} from 'rxjs/operators';
import { Component, OnInit, NgModule, OnDestroy, Output,EventEmitter } from '@angular/core';
import { DataBaseService } from 'src/app/data-base.service';
import {User} from 'src/app/user.model'
import { Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';



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
  
//   friend: Friend;
//  check = '5';
//  showMeUserSurname: string;
//  showMeUserName: string;

  // constructor(private router: Router, public authService: AuthService, public dbService: DataBaseService) { }

  // ngOnInit() {
  //   this.friend = this.dbService.getRandomFriend();

    

  //     const path = this.authService.user.uid
  //     const db = firebase.firestore();
    

  //     let oneUser = db.collection('users').doc(`${path}`)
     
  //     oneUser.get()
  //       .then(snap => {
  //        this.showMeUserSurname = snap.data().surname;
  //   });

  //     oneUser.get()
  //       .then(snap => {
  //       this.showMeUserName = snap.data().userName;
  //     });
  //   }
  public buttonClickEventTrack = new Subject();
  click:boolean = true;
  editBtn:any;
  data:any = {};
  subscription: Subscription;
  
  //dodalem do konstruktora routing w celu uzycia go w funkcji editProfile
  constructor(private router: Router, private dbService: DataBaseService) {
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
  
  //Zadaniem funkcji jest przekierowanie do komponentu zajmujacego sie edycja profilu
  editProfile(){
    this.router.navigate(['/profile/edit-profile'])
  }




  
}

