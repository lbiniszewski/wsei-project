import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { DataBaseService } from 'src/app/data-base.service';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-show-opinion',
  templateUrl: './show-opinion.component.html',
  styleUrls: ['./show-opinion.component.scss']
})
export class ShowOpinionComponent implements OnInit,AfterContentChecked {
  actualUserKey:any;
  getContainerOpinionBtn:any;
  textAreaOpinionValue:any;
  safeImage:any;
  userOpinionArray:any = [];
  searchBtnClick:boolean;
  getAddBtn:any;
  id:any =this.activatedRoutes.snapshot.params['id'];
  click:boolean = true;
  constructor(private dbService: DataBaseService,
    private sanitizer:DomSanitizer,
    private activatedRoutes:ActivatedRoute,
    private router:Router) {
    this.subUserArray();
    this.dbService.searchBtnClick.subscribe(data=>{
      this.searchBtnClick = data
      this.showAddBtn();
    })
    this.dbService.actualUserKey.subscribe(data=>{
      this.actualUserKey = data
    })
  }
  showAddBtn(){
    if(this.searchBtnClick==true){
      this.dbService.database.collection('users').doc(this.dbService.loggedUserKey)
      .collection('friends').doc(this.actualUserKey).get().toPromise().then(snapshot=>{
        this.getAddBtn = document.querySelector('.addOpinionBtn')
        if(snapshot.exists){
          this.getAddBtn.style.display = 'block'
        }else{
          this.getAddBtn.style.display = 'none'
        }
      }
      )
    }
  }
  routeToUser(key:any){
    
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>{
      this.actualUserKey = key
      this.dbService.actualUserKey.next(this.actualUserKey)
       this.dbService.searchBtnClick.next(this.click)
    this.router.navigateByUrl(`/home/readOnProf/${key}`)
    });
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
      .doc(this.id)
      .collection('opinionAboutUser')
      .doc(this.dbService.loggedUserKey).set({
        opinion:this.textAreaOpinionValue.value
      })
      this.getContainerOpinionBtn.style.display = 'none'
      this.dbService.arrayOfUserWhichGaveOpinion(this.id);
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
