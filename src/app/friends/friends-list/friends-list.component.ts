import { Component, OnInit } from '@angular/core';
import { Friend, DataBaseService } from '../../data-base.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent {

  friends: Array<Friend>;

    constructor(private dbService: DataBaseService) { }

    ngOnInit() {
      this.dbService.getFriends().subscribe(list => {
        this.friends = list;
      });
    }

}

