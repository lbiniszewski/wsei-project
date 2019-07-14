import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { DataBaseService } from 'src/app/data-base.service';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

//dodanie do konstruktora serwisow bazy danych, routera (konieczny przy przekierwoaniach)
//oraz autentitacion service do weryfikacji ktory to profil w bazie
  constructor(private router: Router, public authService: AuthService, public dbService: DataBaseService) { }

  ngOnInit() {
  }

  //definiowanie przycisku anulowania wpisu plus przekierowanie do home
  cancelInput(){
    this.router.navigate(['/home'])
  }

  // funkcja wlasciwa dodajaca dane do bazy
  addData(formData: NgForm){
    
    //definiowanie odniesienia do bazy firestore dla odpowieniego uzytkownika
    //weryfikacja po numerze uid
    const path = this.authService.user.uid
    const db = firebase.firestore();
    
    //otworzenie polaczenia z baza dla konkretnego uzytkownika
    let oneUser = db.collection('users').doc(`${path}`)
    
    
    //bindowanie danych z formularza do odpowiednich pol w bazie
    oneUser.set({
      aboutMe: formData.value.aboutMe,
      surname: formData.value.surname,
      userName: formData.value.userName,
      userPhoto: formData.value.userPhoto
    })
    //Komentarz sprawdzajacy czy dodano
    .then(function(){
      console.log("Document is added to data base");
    })
    //Sprawdzenie bledu gdy nie dodano
    .catch(function(error){
      console.error("Problem with data adding", error);
    });
    
    //Przekierowanie do odpowiedniej podstrony home
    this.router.navigate(['/home'])
  
    }


}
