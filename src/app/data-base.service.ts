import { Injectable } from '@angular/core';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';



import 'firebase/firestore';
import { AuthService } from './auth/auth.service';


const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");


firebase.initializeApp({
  apiKey: "AIzaSyAdjxXGTP8DeaHj7We_qGBZeyr3PLZOd3U",
  authDomain: "web-portfolio-513ae.firebaseapp.com",
  projectId: "web-portfolio-513ae"
});







@Injectable()
export class DataBaseService {

  Friends = [
    new Friend('1', 'Wyswietlanie informacji o uzytkowniku', 'Kowalski', 'Stefan', 'ciag znakow do fotografi'),
    new Friend('2', 'Wyswietlanie informacji o uzytkowniku', 'Buga', 'Malwina', 'ciag znakow do fotografi'),
    new Friend('3', 'Wyswietlanie informacji o uzytkowniku', 'Nowak', 'Jan', 'ciag znakow do fotografi'),
    new Friend('4', 'Wyswietlanie informacji o uzytkowniku', 'Wojciechowska', 'Katarzyna', 'ciag znakow do fotografi'),
  ];






  getFriends(): Observable<Array<Friend>> {
    return Observable.of(this.Friends);
  }

  getFriendById(id: string): Friend {
    return this.Friends.find(e => e.id === id);
  }

  getRandomFriend() {
    const n = Math.floor(Math.random() * 3);
    return this.Friends[n];
  }

}

export class Friend {
  constructor( public id: string, public aboutMe: string, public surname: string, public userName: string, public userPhoto: string) { }
}