import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { DataBaseService } from 'src/app/data-base.service';
import * as firebase from 'firebase';

import { Component, OnInit, AfterContentChecked, ɵConsole } from '@angular/core';
import { DataBaseService } from 'src/app/data-base.service';
import { User } from 'src/app/user.model'
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageCropperComponent } from 'ngx-image-cropper';
@Component({
  selector: 'app-show-photo',
  templateUrl: './show-photo.component.html',
  styleUrls: ['./show-photo.component.scss']
})
export class ShowPhotoComponent implements OnInit {
  showMeUserAbout: string;


  constructor(private router: Router, public authService: AuthService, public dbService: DataBaseService) { }

  ngOnInit() {
    const path = this.authService.user.uid
    const db = firebase.firestore();
  

    let oneUser = db.collection('users').doc(`${path}`)
   
    oneUser.get()
      .then(snap => {
       this.showMeUserAbout = snap.data().aboutMe;
  });



export class ShowPhotoComponent implements OnInit, AfterContentChecked {
  userData: any = {};
  subscription: Subscription;
  clicked: Boolean;
  getTextArea: any;
  textValue: string;
  getPhotoAddBtn: any;
  base64textString = [];
  safeImage: any;
  getTextAreaValue: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  getImgCropper:any;
  constructor(private dbService: DataBaseService,
    private sanitizer: DomSanitizer
  ) {
    this.subscription = this.dbService.sendUserData().subscribe(data => {
      this.userData = data
      this.makeSafeUrl()
      console.log(this.safeImage)
      console.log(this.userData)
    })
    this.dbService.buttonClickTrack.subscribe(event => {
      this.clicked = event
      console.log(this.clicked)
      this.writingInTextArea()
    })
  }
  makeSafeUrl() {
    this.safeImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.userData.photo);

  }
  writingInTextArea() {
    if (this.clicked == true) {
      this.getTextArea.removeAttribute("readonly")
      this.getPhotoAddBtn.style.display = "block"
    } else {

      this.updateDataBase();
      this.getPhotoAddBtn.style.display = "none";
      this.getTextArea.setAttribute("readonly", "");
      console.log(this.base64textString)

    }
  }
  updateDataBase() {
    console.log(this.getTextArea.value)
    if (this.userData.photo == "" || this.userData.photo != this.base64textString.toString() && this.base64textString.toString() != "") {
      this.dbService.database.collection('users')
        .doc('oZbVhmP51LWibJ9qgbGcGugIBSX2').update({
          
          userPhoto: this.base64textString.toString()
        })
    }

    this.dbService.database.collection('users')
      .doc('oZbVhmP51LWibJ9qgbGcGugIBSX2').update({
        aboutMe: this.getTextArea.value,

      })

  }
  handleFileSelect(evt) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
    console.log(this.base64textString)
    this.imageChangedEvent = evt;
  }

  handleReaderLoaded(e) {
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
  }
imageCropped(event: ImageCroppedEvent) {
  this.croppedImage = event.base64;
  this.base64textString = this.croppedImage
  console.log(event);
  console.log(typeof this.croppedImage)
  console.log(typeof this.base64textString)
}
imageLoaded() {
  this.getImgCropper = document.querySelector('.imgCropperPopUp')
  this.getImgCropper.style.display="block"
   console.log('Image loaded')
}
cropperReady() {
  
  console.log('Cropper ready')
  
}
loadImageFailed () {
  console.log('Load failed');
}
savePhoto(){
  this.getImgCropper.style.display = "none"
  console.log(this.croppedImage)
  console.log(this.base64textString)
}
  ngOnInit() {
  }
  ngAfterContentChecked() {
    this.getTextArea = document.querySelector('#exampleFormControlTextarea1')
    this.getPhotoAddBtn = document.querySelector('.customInputFile')
  }
}
