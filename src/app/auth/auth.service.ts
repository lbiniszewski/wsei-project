import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class AuthService {


  user: User; //jest to token, użytkownik który jest zawracany po zalogowaniu
  constructor(private angularFire: AngularFireAuth, private router: Router) { 
    //metoda sprawdzająca użytkownika, będzie informowała czy użytkownik jest zalogowany czy nie jest
    // metoda zwraca observable którym jest użytkownik albo null
    //jeżeli pojawi się użytkownik to poprzez ta metode zo zmiennej user zostanie dopisany użytkownik
    //analiza czy jest null czy jest użytkownik wykorzystana zostanie do kontroli widoków zalogowany/niezalogowany
    //metoda będzie odpalana zawsze gdy po stronie firebase zmieni sie stan tokena
    //metoda działa automatycznie ponieważ ją subskrybujemy
    angularFire.authState.subscribe(user=>{
      this.user = user;
      
    });
  }

  login(email: string, password: string){
    this.angularFire.auth.signInWithEmailAndPassword(email, password)
    .then(user=>{
      window.localStorage.setItem('loggedUserId',user.user.uid);//getting user key (adam)
      this.router.navigate(['/home']);  
}).catch(err=>{
      console.log(err);
    });
  }

  signup(email: string, password: string){
    this.angularFire.auth.createUserWithEmailAndPassword(email,password)
    .then(user => {
    //  this.router.navigate(['/home']); przekierwoanie nastepuje w module register
    }).catch(err => {
      console.log(err);
    });
  }

  logout(){
    window.localStorage.removeItem('loggedUserId')//removing user key /adam
    this.angularFire.auth.signOut();
  }
}
