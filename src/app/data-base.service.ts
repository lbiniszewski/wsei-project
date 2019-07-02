import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { User } from './user.model'
import { AngularFireObject, AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs';

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
  userDataList: User[];
  private userData= new Subject<User>();
  getUserData(){
    let userRef = this.database.collection('users').doc('whjbKVHSLiarH2YYhv6ktntpcS72');
      let getData = userRef.get().toPromise().then(doc=>{
      const actualUser = new User();
      actualUser.$key = doc.id
      actualUser.name = doc.data().userName
      actualUser.surname = doc.data().surname
      actualUser.aboutMe = doc.data().aboutMe
      // this.userDataList.push(actualUser)
       this.userData.next({$key:doc.id,
      name:doc.data().userName,
       surname:doc.data().surname,
       aboutMe:doc.data().aboutMe
       })
      
        console.log(doc.data())
        console.log(this.userData)
      })
  }
  sendData():Observable<any>{
    return this.userData.asObservable();
  }
  constructor(public database:AngularFirestore) {
    this.getUserData()
    console.log(this.userData)
  }
  
}

export class Friend {
  constructor(public id: string, public title: string, public content: string) { }
}