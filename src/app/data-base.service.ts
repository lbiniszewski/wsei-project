import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

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

}

export class Friend {
  constructor(public id: string, public title: string, public content: string) { }
}