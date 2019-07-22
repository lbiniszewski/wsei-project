import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { DataBaseService } from '../data-base.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-app-search',
  templateUrl: './app-search.component.html',
  styleUrls: ['./app-search.component.scss']
})
export class AppSearchComponent implements OnInit,AfterContentChecked{
  click:boolean= true;
  searchBtnValue:any;
  constructor(private dbService:DataBaseService,
    private router: Router
    ) { 
  }
  getUser(){
   this.dbService.searchInputValue.next(this.searchBtnValue.value)
  }
  ngOnInit() {
  }
  ngAfterContentChecked(){
    
    this.searchBtnValue = document.querySelector('.searchInput')
  }
  
}

