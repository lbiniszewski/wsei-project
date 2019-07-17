import { Component, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/data-base.service';

@Component({
  selector: 'app-show-tematical-module',
  templateUrl: './show-tematical-module.component.html',
  styleUrls: ['./show-tematical-module.component.scss']
})
export class ShowTematicalModuleComponent implements OnInit {
  thematicalModulesArray = [];
  clicked:boolean;
  getTextArea:any;
  constructor(private dbService: DataBaseService) {
    this.dbService.sendThematicalModuleArray().subscribe(data=>{
      this.thematicalModulesArray = data
      console.log(this.thematicalModulesArray)
    })
    this.dbService.buttonClickTrack.subscribe(event => {
     this.clicked = event
     this.writingInTextArea()
     console.log(this.clicked)
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
      
      console.log(this.getTextArea[0])
      for(let i=0; i<this.thematicalModulesArray.length;i++){
        console.log(this.thematicalModulesArray[i].topicTitle)
      this.dbService.database.collection('users').doc(this.dbService.actualUserKey).collection('thematicalModule')
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
