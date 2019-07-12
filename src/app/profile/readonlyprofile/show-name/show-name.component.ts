import { Component, OnInit, NgModule, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { DataBaseService, Friend } from 'src/app/data-base.service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';

@Component({
  selector: 'app-show-name',
  templateUrl: './show-name.component.html',
  styleUrls: ['./show-name.component.scss']
})
@NgModule({
  exports:[
    ShowNameComponent,
  ]
})
export class ShowNameComponent implements OnInit {
  
  friend: Friend;
 check = '5';
 showMeUserSurname: string;
 showMeUserName: string;

  constructor(private router: Router, public authService: AuthService, public dbService: DataBaseService) { }

  ngOnInit() {
    this.friend = this.dbService.getRandomFriend();

    

      const path = this.authService.user.uid
      const db = firebase.firestore();
    

      let oneUser = db.collection('users').doc(`${path}`)
     
      oneUser.get()
        .then(snap => {
         this.showMeUserSurname = snap.data().surname;
    });

      oneUser.get()
        .then(snap => {
        this.showMeUserName = snap.data().userName;
      });
  
    
  }





  
}

