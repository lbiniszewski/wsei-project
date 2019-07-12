import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { AppSearchComponent } from 'src/app/search/app-search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  
  constructor(public authService: AuthService, private router:Router){

  }

  

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
