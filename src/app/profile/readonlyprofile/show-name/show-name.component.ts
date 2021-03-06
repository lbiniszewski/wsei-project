import { Component, OnInit, NgModule } from '@angular/core';
import { DataBaseService } from 'src/app/data-base.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';



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
  loggedUserKey= window.localStorage.getItem('loggedUserId')
  id:any =this.activatedRoutes.snapshot.params['id'];
  //dodalem do konstruktora routing w celu uzycia go w funkcji editProfile
  constructor(private router: Router, private dbService: DataBaseService,private activatedRoutes:ActivatedRoute) {
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
    if (this.actualUserKey != this.dbService.loggedUserKey) {
      this.dbService.database.collection('users').doc(this.dbService.loggedUserKey).collection('friends').doc(this.actualUserKey).get().toPromise().then(snapshot => {
        this.editBtn = document.querySelector('#editAddBtn')
        this.addToFriendBtn = document.querySelector('#addToFriendBtn')
        if(snapshot.exists &&snapshot.id == this.actualUserKey) {
          this.editBtn.style.display = 'none'
          this.addToFriendBtn.style.display = 'block'
          this.addToFriendBtn.innerHTML = 'Usuń'
        }else {
          this.editBtn.style.display = 'none'
          this.addToFriendBtn.style.display = 'block'
          this.addToFriendBtn.innerHTML = 'Dodaj'

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
    this.addToFriendBtn = document.querySelector('#addToFriendBtn')
    if (this.addToFriendBtn.innerHTML == 'Dodaj') {
      this.dbService.database.collection('users').doc(this.dbService.loggedUserKey).collection('friends').doc(this.id).set(data)
      this.addToFriendBtn.innerHTML = 'Usuń'
      this.dbService.actualUserKey.next(this.id)
       this.dbService.searchBtnClick.next(this.click)
    } else if (this.addToFriendBtn.innerHTML == 'Usuń') {
      this.dbService.database.collection('users').doc(this.dbService.loggedUserKey).collection('friends').doc(this.id).delete()
      this.addToFriendBtn.innerHTML = 'Dodaj'
      this.dbService.actualUserKey.next(this.id)
       this.dbService.searchBtnClick.next(this.click)
    }

  }
  editBtnClicked() {
    this.dbService.buttonClickTrack.next(this.click)
    this.editBtn = document.querySelector('#editAddBtn')
    this.userNameParagraph = document.querySelector('.nameSurnameParagraph')
    this.editUserNameParagraph = document.querySelector('.editNameAndSurname')
    this.nameValue = document.querySelector('.imie')
    this.surnameValue = document.querySelector('.nazwisko')
    if (this.click === true && this.editBtn.innerHTML == "Edytuj") {
      this.nameValue.value = this.data.name
    this.surnameValue.value = this.data.surname
      this.editBtn.innerHTML = 'Zapisz'
      this.click = false;
      this.userNameParagraph.style.display = "none"
      this.editUserNameParagraph.style.display = "flex"
    } else {
      this.sendNewNameAndSurname();
      this.userNameParagraph.style.display = "block"
      this.editUserNameParagraph.style.display = "none"
      this.editBtn.innerHTML = 'Edytuj'
      this.click = true;
    }
  }
  sendNewNameAndSurname() {
    this.nameValue = document.querySelector('.imie')
    this.surnameValue = document.querySelector('.nazwisko')
    this.dbService.database.collection('users')
      .doc(this.loggedUserKey).update({
        userName: this.nameValue.value,
        surname: this.surnameValue.value
      })
      this.dbService.getUserData(this.loggedUserKey);
    this.dbService.arrayOfUserWhichGaveOpinion(this.loggedUserKey)
    this.dbService.getArrayOfThematicalModule(this.loggedUserKey);
  }
  ngOnInit() {
  }
  ngAfterContentChecked(){
    this.editBtn = document.querySelector('#editAddBtn')
    this.addToFriendBtn = document.querySelector('#addToFriendBtn')
  }





}

