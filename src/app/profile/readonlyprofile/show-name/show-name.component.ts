import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-show-name',
  templateUrl: './show-name.component.html',
  styleUrls: ['./show-name.component.scss']
})
@NgModule({
  exports:[
    ShowNameComponent,
  ]
})
export class ShowNameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
