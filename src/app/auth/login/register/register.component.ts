
import { NgForm } from '@angular/forms';
import { Component, OnInit, NgModule, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { DataBaseService, Friend } from 'src/app/data-base.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    showMeUserSurname: string;
    showMeUserName: string;
    public showField = false;
    

  
    constructor(private authService: AuthService, public dbService: DataBaseService, private router: Router) { }

  ngOnInit() {

  }


 // login(formData: NgForm){
 //   this.authService.login(formData.value.email, formData.value.password);
 // }

  signup(formData: NgForm){
    this.authService.signup(formData.value.email, formData.value.password);
    this.showField = true;
  }


  addData(formData: NgForm){
    
    console.log(this.authService.user.uid);
    const path = this.authService.user.uid
    const db = firebase.firestore();
    
    
    let oneUser = db.collection('users').doc(`${path}`)
    window.localStorage.setItem('loggedUserId',path);//odzytanie klucz uzytkownika przy rejsteracjiw celu wyświetlenia jego profilu
    oneUser.set({
      aboutMe: formData.value.aboutMe,
      surname: formData.value.surname,
      userName: formData.value.userName,
      userPhoto: formData.value.userPhoto
    })
    //stworzenie ścieżek dostępu dla wyświtlania innego modułu
    oneUser.collection('thematicalModule').doc('Film').set({desc:''})
    oneUser.collection('thematicalModule').doc('Hobby').set({desc:''})
    oneUser.collection('thematicalModule').doc('Muzyka').set({desc:''})
    oneUser.collection('thematicalModule').doc('Sport').set({desc:''})
    .then(function(){
      console.log("Document is added to data base");
    })
    .catch(function(error){
      console.error("Problem with data adding", error);
    });
    this.router.navigate(['/home']);
}


}


