import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { AppSearchComponent } from 'src/app/search/app-search.component';
import { DataBaseService } from './data-base.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService, private router:Router,private dbService:DataBaseService){
  }
  ngOnInit(){
    this.router.navigate(['/home'])

  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
