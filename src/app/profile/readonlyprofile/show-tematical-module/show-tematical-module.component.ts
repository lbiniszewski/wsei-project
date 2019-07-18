import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { DataBaseService } from 'src/app/data-base.service';

@Component({
  selector: 'app-show-tematical-module',
  templateUrl: './show-tematical-module.component.html',
  styleUrls: ['./show-tematical-module.component.scss']
})
export class ShowTematicalModuleComponent implements OnInit,AfterContentChecked {
  thematicalModulesArray = [];
  clicked:boolean;
  getTextArea:any;
  constructor(private dbService: DataBaseService) {
    this.dbService.sendThematicalModuleArray().subscribe(data=>{
      this.thematicalModulesArray = data
      
    })
    this.dbService.buttonClickTrack.subscribe(event => {
     this.clicked = event
     this.writingInTextArea()
     
    })
  }
  writingInTextArea() {
    
    this.getTextArea.forEach(element => {
      
      if (this.clicked == true) {
        element.removeAttribute("readonly")
      } else {
        this.sendTextAreasValueToDB()
        element.setAttribute("readonly", "");
      }
    
    });}
    sendTextAreasValueToDB(){
      
      
      for(let i=0; i<this.thematicalModulesArray.length;i++){
        
      this.dbService.database.collection('users').doc(this.dbService.loggedUserKey).collection('thematicalModule')
      .doc(this.thematicalModulesArray[i].topicTitle)
      .update({
      desc:this.getTextArea[i].value
      })
    }
    }
  ngOnInit() {
  }
  ngAfterContentChecked() {
    
    this.getTextArea = document.querySelectorAll('.textareaThemMod')
    
  }

}
