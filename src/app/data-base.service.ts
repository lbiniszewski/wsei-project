import { Injectable } from '@angular/core';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { User, Opinion } from './user.model'
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, BehaviorSubject } from 'rxjs';
import 'firebase/firestore';
import { AuthService } from './auth/auth.service';
import * as firebase from 'firebase';

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
  ]
  FriendS = [
    new Friend('1', '', 'Pawel', 'Malinowski', 'Uruchamia informacje o użytkowniku'),
    new Friend('2', '', 'Edyta', 'Oziemska', 'Uruchamia informacje o użytkowniku'),
    new Friend('3', '', 'Ryszard', 'Skoneczny', 'Uruchamia informacje o użytkowniku'),
    new Friend('4', '', 'Malwina', 'Buga', 'Uruchamia informacje o użytkowniku'),
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
  public actualUserKey: string = window.localStorage.getItem('actualUserID')
  private userData = new Subject<User>();
  private userOpinionData = new Subject<[Opinion]>();
  private userDataWhichGaveOpinion = new Subject<User>();
  public userOpinionKey = '';
  public buttonClickTrack = new Subject<any>();
  public opinionDataToSend = new Subject<any>();
  public arrayOfUserOpinion = new Subject<[{}]>();
  // public arrayOfUserOpinion = []
  getUserData(key: string) {
    this.database
      .collection('users')
      .doc(`${key}`).get().toPromise().then(doc => {
        this.userData.next({
          $key: doc.id,
          name: doc.data().userName,
          surname: doc.data().surname,
          aboutMe: doc.data().aboutMe,
          photo: doc.data().userPhoto
        })
      })
    this.getUserOpinionData(this.actualUserKey)
  }
  getUserDataWhichGaveOpinion(key: string) {
    this.database
      .collection('users')
      .doc(key).get().toPromise().then(doc => {
        this.userDataWhichGaveOpinion.next({
          $key: doc.id,
          name: doc.data().userName,
          surname: doc.data().surname,
          aboutMe: doc.data().aboutMe,
          photo: doc.data().userPhoto
        })
        
      })
  }
  getUserOpinionData(userkey: string) {
    this.database.collection('users')
      .doc(userkey)
      .collection('opinionAboutUser')
      .doc('SRImNX5L3DTktcOvPoe8F0vSpQl1')
      .get().toPromise().then(doc => {
        this.userOpinionData.next([{
          $opinionKey: doc.id,
          opinionAboutUser: doc.data().opinion
        }])
        // this.userOpinionKey = doc.id
      })

  }
  arrayOfUserWhichGaveOpinion() {
    let opinionRef =  this.database.collection('users').doc(this.actualUserKey).collection('opinionAboutUser');
    let userRef = this.database.collection('users');
    
      opinionRef.get().toPromise().then(snapshot => {
        snapshot.forEach(doc => {
          this.arrayOfUserOpinion.next([{
            key: doc.id,
            
            opinion: doc.data().opinion,
          }])
          
          this.userOpinionKey = doc.id;

        })
      });
     

  }
  sendUserData(): Observable<any> {
    return this.userData.asObservable();
  }
  sendUserOpinionData(): Observable<any> {
    return this.userOpinionData.asObservable();
  }
  sendUserWhichGaveOpinion(): Observable<any> {
    return this.userDataWhichGaveOpinion.asObservable();
  }
  sendUserArray(): Observable<any[]> {

    return this.arrayOfUserOpinion.asObservable()
  }
  constructor(public database: AngularFirestore) {

   
    // this.getUserDataWhichGaveOpinion(this.userOpinionKey)
    this.arrayOfUserWhichGaveOpinion()
  }

}

export class Friend {
  constructor(public id: string, public aboutMe: string, public surname: string, public userName: string, public userPhoto: string) { }
}