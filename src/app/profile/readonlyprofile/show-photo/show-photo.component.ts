import { Component, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/data-base.service';
import {User} from 'src/app/user.model'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-show-photo',
  templateUrl: './show-photo.component.html',
  styleUrls: ['./show-photo.component.scss']
})
export class ShowPhotoComponent implements OnInit {
  data:any = {};
  subscription: Subscription;
  constructor(private dbService: DataBaseService) {

    this.subscription = this.dbService.sendData().subscribe(data =>{
      this.data = data
      console.log(data)
    })
   }

  ngOnInit() {
  }

}
