import { Component, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/data-base.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-opinion',
  templateUrl: './show-opinion.component.html',
  styleUrls: ['./show-opinion.component.scss']
})
export class ShowOpinionComponent implements OnInit {
  subOpinion: Subscription;
  opinionData: any = {};
  userOpinionData: any = {};
  subscription: Subscription;
  
  constructor(private dbService: DataBaseService) {
    
    this.subOpinionData();
    this.subUserOpinionName();
    
    
    
  }
  
  subOpinionData() {
    this.subOpinion = this.dbService.sendUserOpinionData().subscribe(data => {
      this.opinionData = data
    })
  }
  subUserOpinionName() {
    
    this.subscription = this.dbService.sendUserWhichGaveOpinion().subscribe(data => {
      this.userOpinionData = data;
      console.log(this.userOpinionData)
    })
    
  }
  ngOnInit() {
    
  }

}
