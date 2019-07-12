import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { DataBaseService } from 'src/app/data-base.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-show-photo',
  templateUrl: './show-photo.component.html',
  styleUrls: ['./show-photo.component.scss']
})
export class ShowPhotoComponent implements OnInit {
  showMeUserAbout: string;


  constructor(private router: Router, public authService: AuthService, public dbService: DataBaseService) { }

  ngOnInit() {
    const path = this.authService.user.uid
    const db = firebase.firestore();
  

    let oneUser = db.collection('users').doc(`${path}`)
   
    oneUser.get()
      .then(snap => {
       this.showMeUserAbout = snap.data().aboutMe;
  });



  }

}
