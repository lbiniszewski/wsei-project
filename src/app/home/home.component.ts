import { Component, OnInit } from '@angular/core';
import { DataBaseService, Friend } from '../data-base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  friend: Friend;

  constructor(private dbService: DataBaseService, private router: Router) { }

  ngOnInit() {
    this.friend = this.dbService.getRandomCoruse();
  }

  getfriend() {
    this.router.navigate(['/friends', this.friend.id]);
  }

}

