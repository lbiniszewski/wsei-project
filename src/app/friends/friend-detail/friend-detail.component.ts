import { Component, OnInit } from '@angular/core';
import { Friend, DataBaseService } from '../../data-base.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-friend-detail',
  templateUrl: './friend-detail.component.html',
  styleUrls: ['./friend-detail.component.css']
})
export class FriendDetailComponent implements OnInit {

  friend: Friend;

  constructor(private dbService: DataBaseService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((param: Params) => {
      this.friend = this.dbService.getFriendById(param.get('id'));
    });
  }

}
