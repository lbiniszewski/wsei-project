import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { User, Opinion } from './user.model'
import { AngularFireObject, AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class DataBaseService {
  FriendS = [
    new Friend('1', 'Pawel Malinowski', 'Uruchamia informacje o użytkowniku'),
    new Friend('2', 'Edyta Oziemska', 'Uruchamia informacje o użytkowniku'),
    new Friend('3', 'Ryszard Skoneczny', 'Uruchamia informacje o użytkowniku'),
    new Friend('4', 'Malwina Buga', 'Uruchamia informacje o użytkowniku')
  ];

  getFriends(): Observable<Array<Friend>> {
    return Observable.of(this.FriendS);
  }

  getFriendById(id: string): Friend {
    return this.FriendS.find(e => e.id === id);
  }

  getRandomCoruse() {
    const n = Math.floor(Math.random() * 3);
    return this.FriendS[n];
  }
  private userKey: string = 'oZbVhmP51LWibJ9qgbGcGugIBSX2';
  private userData = new Subject<User>();
  private userOpinionData = new Subject<Opinion>();
  private userDataWhichGaveOpinion = new Subject<User>();
  private userOpinionKey = 'whjbKVHSLiarH2YYhv6ktntpcS72';
  getUserData(key:string) {
    let userRef = this.database
      .collection('users')
      .doc(`${key}`);
    userRef.get().toPromise().then(doc => {
      this.userData.next({
        $key: doc.id,
        name: doc.data().userName,
        surname: doc.data().surname,
        aboutMe: doc.data().aboutMe,
      })
    })
  }
  getUserDataWhichGaveOpinion(key:string) {
    console.log(key,typeof key)
    let userRef = this.database
      .collection('users')
      .doc(`${key}`);
    userRef.get().toPromise().then(doc => {
      console.log(doc.data())
      this.userDataWhichGaveOpinion.next({
        $key: doc.id,
        name: doc.data().userName,
        surname: doc.data().surname,
        aboutMe: doc.data().aboutMe,
      })
    })
  }
  getUserOpinionData(){
      let  opinionRef= this.database.collection('users')
      .doc('oZbVhmP51LWibJ9qgbGcGugIBSX2')
      .collection('opinionAboutUser')
      .doc('whjbKVHSLiarH2YYhv6ktntpcS72');
      opinionRef.get().toPromise().then(doc => {
       this.userOpinionData.next({
         $opinionKey: doc.id,
         opinionAboutUser: doc.data().opinion
       })
       this.userOpinionKey = doc.id
       console.log(this.userOpinionKey)
    })
    
  }
  sendUserData(): Observable<any> {
    return this.userData.asObservable();
  }
  sendUserOpinionData():Observable<any> {
    return this.userOpinionData.asObservable();
  }
  sendUserWhichGaveOpinion():Observable<any>{
    return this.userDataWhichGaveOpinion.asObservable();
  }
  constructor(public database: AngularFirestore) {
    this.getUserData(this.userKey);
    this.getUserOpinionData()
    this.getUserDataWhichGaveOpinion(this.userOpinionKey)
  }

}

export class Friend {
  constructor(public id: string, public title: string, public content: string) { }
}