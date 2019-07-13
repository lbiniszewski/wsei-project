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
  
  opinionData: any = {};
  userOpinionData: any = {};
  getAddOpinionBtn:any;
  textAreaOpinionValue:any;
  safeImage:any;
  userArray:any = [];
  constructor(private dbService: DataBaseService,
    private sanitizer:DomSanitizer) {
    this.subOpinionData();
    this.subUserOpinionName();
    this.subUserArray();
    console.log(this.opinionData)
    console.log(this.userArray)
  }

  subOpinionData() {
    this.dbService.sendUserOpinionData().subscribe(data => {
      this.opinionData = data
    })
  }
   subUserOpinionName() {
     this.dbService.sendUserWhichGaveOpinion().subscribe(data => {
       this.userOpinionData = data;
      
       this.makeSafeUrl();
       console.log(this.userOpinionData);
     })
   }
  subUserArray(){
    this.dbService.sendUserArray().subscribe(data=>{
      this.userArray = data;
      console.log(this.userArray);
      console.log(data)
    })
  }
  addNewOpinion(){
    this.getAddOpinionBtn.style.display = 'block'
  }
  sendDataToDataBase(){
    console.log(this.textAreaOpinionValue)
    this.dbService.database.collection('users')
      .doc(this.dbService.actualUserKey)
      .collection('opinionAboutUser')
      .doc('TCte0YgH4576lvFVvHfP').set({
        opinion:this.textAreaOpinionValue.value
      })
      this.getAddOpinionBtn.style.display = 'none'
  }
  makeSafeUrl() {
    this.safeImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.userOpinionData.photo);
    console.log(this.safeImage)
  } 
  ngOnInit() {
    
  }
  ngAfterContentChecked(){
    this.getAddOpinionBtn = document.querySelector('.addNewOpinionPopUp')
    this.textAreaOpinionValue = document.querySelector('.textAreaOpinionValue')
  }
  

}
