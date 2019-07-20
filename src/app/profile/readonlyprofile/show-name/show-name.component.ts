import { Component, OnInit, NgModule } from '@angular/core';
import { DataBaseService } from 'src/app/data-base.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-show-name',
  templateUrl: './show-name.component.html',
  styleUrls: ['./show-name.component.scss']
})
@NgModule({
  exports: [
    ShowNameComponent,
  ],
  imports: [
    DataBaseService
  ]
})
export class ShowNameComponent implements OnInit {
  actualUserKey: any;
  click: boolean = true;
  editBtn: any;
  addToFriendBtn: any;
  userNameParagraph: any;
  data: any = {};
  subscription: Subscription;
  editUserNameParagraph: any;
  nameValue: any;
  surnameValue: any;
  searchBtnClick: boolean;
  //dodalem do konstruktora routing w celu uzycia go w funkcji editProfile
  constructor(private router: Router, private dbService: DataBaseService) {
    this.subscription = this.dbService.sendUserData().subscribe(data => {
      this.data = data
    })
    this.dbService.searchBtnClick.subscribe(data => {
      this.searchBtnClick = data
    })
    this.dbService.actualUserKey.subscribe(data => {
      this.actualUserKey = data
      this.searchBtnClicked()
    })

  }
  searchBtnClicked() {
    this.editBtn = document.querySelector('#editBtn')
    this.addToFriendBtn = document.querySelector('#addToFriendBtn')
    this.editBtn.style.display = 'none'
    if (this.searchBtnClick == true) {
      this.dbService.database.collection('users').doc(this.dbService.loggedUserKey).collection('friends').doc(this.actualUserKey).get().toPromise().then(snapshot => {
        if(snapshot.exists &&snapshot.id === this.actualUserKey) {
          this.addToFriendBtn.style.display = 'block'
          this.addToFriendBtn.innerHTML = 'Usuń znajomego'
        }else if(!snapshot.exists){
          this.addToFriendBtn.style.display = 'block'
          this.addToFriendBtn.innerHTML = 'Dodaj do znajomych'

        }
      })
    }
    else {
      this.editBtn.style.display = 'block'
      this.addToFriendBtn.style.display = 'none'
    }
  }
  addToFriends() {
    let data = {}
    if (this.addToFriendBtn.innerHTML == 'Dodaj do znajomych') {
      this.dbService.database.collection('users').doc(this.dbService.loggedUserKey).collection('friends').doc(this.actualUserKey).set(data)
    } else if (this.addToFriendBtn.innerHTML == 'Usuń znajomego') {
      this.dbService.database.collection('users').doc(this.dbService.loggedUserKey).collection('friends').doc(this.actualUserKey).delete()
    }
  }
  editBtnClicked() {
    this.dbService.buttonClickTrack.next(this.click)
    this.editBtn = document.querySelector('#editBtn')
    this.userNameParagraph = document.querySelector('.nameSurnameParagraph')
    this.editUserNameParagraph = document.querySelector('.editNameAndSurname')
    if (this.click === true && this.editBtn.innerHTML == "Edytuj") {
      this.editBtn.innerHTML = 'Zapisz'
      this.click = false;
      this.userNameParagraph.style.display = "none"
      this.editUserNameParagraph.style.display = "flex"
    } else {
      this.sendNewNameAndSurname();
      this.editBtn.innerHTML = 'Edytuj'
      this.click = true;
    }
  }
  sendNewNameAndSurname() {
    this.nameValue = document.querySelector('.imie')
    this.surnameValue = document.querySelector('.nazwisko')
    this.dbService.database.collection('users')
      .doc(this.dbService.loggedUserKey).update({
        userName: this.nameValue.value,
        surname: this.surnameValue.value

      })
  }
  ngOnInit() {

  }

  //Zadaniem funkcji jest przekierowanie do komponentu zajmujacego sie edycja profilu
  editProfile() {
    this.router.navigate(['/profile/edit-profile'])
  }





}

