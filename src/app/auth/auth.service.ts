import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFire: AngularFireAuth, private router: Router) { }

  login(email: string, password: string){
    this.angularFire.auth.signInWithEmailAndPassword(email, password)
    .then(value=>{
      this.router.navigate(['/home']);
      console.log(value);
    }).catch(err=>{
      console.log(err);
    });
  }

  signup(email: string, password: string){
    this.angularFire.auth.createUserWithEmailAndPassword(email,password).then(value => {
      console.log(value);
    }).catch(err => {
      console.log(err);
    });
  }

  logout(){
    this.angularFire.auth.signOut();
  }

}
