import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { User, Opinion } from './user.model'
import { AngularFirestore } from '@angular/fire/firestore';
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
  public actualUserKey: string = 'oZbVhmP51LWibJ9qgbGcGugIBSX2';
  private userData = new Subject<User>();
  private userOpinionData = new Subject<Opinion>();
  private userDataWhichGaveOpinion = new Subject<User>();
  // private userOpinionKey = 'whjbKVHSLiarH2YYhv6ktntpcS72';
  public buttonClickTrack = new Subject<any>();
  public opinionDataToSend = new Subject<any>();
  public arrayOfUserOpinion: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
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
  getUserOpinionData() {
    this.database.collection('users')
      .doc('oZbVhmP51LWibJ9qgbGcGugIBSX2')
      .collection('opinionAboutUser')
      .doc('whjbKVHSLiarH2YYhv6ktntpcS72')
      .get().toPromise().then(doc => {
        this.userOpinionData.next({
          $opinionKey: doc.id,
          opinionAboutUser: doc.data().opinion
        })
        // this.userOpinionKey = doc.id
      })

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
  sendUserArray(): Observable<any> {
    
    return this.arrayOfUserOpinion.asObservable()
  }
  arrayOfUserWhichGaveOpinion() {
    this.database.collection('users').doc(this.actualUserKey).collection('opinionAboutUser')
      .get().toPromise().then(snapshot => {
        snapshot.forEach(doc => {
          this.getUserDataWhichGaveOpinion(doc.id)
          this.arrayOfUserOpinion.value.push(this.userDataWhichGaveOpinion)
          
          console.log(doc.id)
          
        })
      });
      console.log(this.arrayOfUserOpinion)
      
  }
  constructor(public database: AngularFirestore) {
    this.getUserData(this.actualUserKey);
    this.getUserOpinionData()
    // this.getUserDataWhichGaveOpinion(this.userOpinionKey)
    this.arrayOfUserWhichGaveOpinion()
  }

}

export class Friend {
  constructor(public id: string, public title: string, public content: string) { }
}