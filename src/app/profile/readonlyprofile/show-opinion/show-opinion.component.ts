import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { DataBaseService } from 'src/app/data-base.service';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-show-opinion',
  templateUrl: './show-opinion.component.html',
  styleUrls: ['./show-opinion.component.scss']
})
export class ShowOpinionComponent implements OnInit,AfterContentChecked {
   
  getContainerOpinionBtn:any;
  textAreaOpinionValue:any;
  safeImage:any;
  userOpinionArray:any = [];
  searchBtnClick:boolean;
  getAddBtn:any;
  constructor(private dbService: DataBaseService,
    private sanitizer:DomSanitizer) {
    this.subUserArray();
    
    this.dbService.searchBtnClick.subscribe(data=>{
      this.searchBtnClick = data
      console.log(this.searchBtnClick)
      this.showAddBtn();
    })
  }
  showAddBtn(){
    if(this.searchBtnClick==true){
      this.dbService.database.collection('users').doc(this.dbService.loggedUserKey)
      .collection('friends').doc(this.dbService.actualUserKey).get().toPromise().then(snapshot=>{
        console.log(snapshot.data())
        if(snapshot.exists){
          this.getAddBtn.style.display = 'block'
        }
      }
      )
    }
  }
  
   
  subUserArray(){
    this.dbService.sendUserArray().subscribe(data=>{
      this.userOpinionArray = data;
      this.makeSafeUrl();
    })
  }
  addNewOpinion(){
    this.getContainerOpinionBtn.style.display = 'block'
  }
  sendDataToDataBase(){
    
    this.dbService.database.collection('users')
      .doc(this.dbService.actualUserKey)
      .collection('opinionAboutUser')
      .doc(this.dbService.loggedUserKey).set({
        opinion:this.textAreaOpinionValue.value
      })
      this.getContainerOpinionBtn.style.display = 'none'
  }
  makeSafeUrl() {
    this.safeImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.userOpinionArray.photo);
   
  } 
  ngOnInit() {
    
  }
  ngAfterContentChecked(){
    this.getContainerOpinionBtn = document.querySelector('.addNewOpinionPopUp')
    this.textAreaOpinionValue = document.querySelector('.textAreaOpinionValue')
    this.getAddBtn = document.querySelector('.addOpinionBtn')
  }
  

}
