import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css']
})
export class TemplateDrivenFormComponent implements OnInit {

@ViewChild('conctactForm')
conctactForm: NgForm;

  message = new TemplateMessage();
  friends = ['Angular', 'JavaFx', 'Java8', 'OrmLite'];

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.message);
    this.reset();
  }

  reset(){
    this.message = new TemplateMessage();
    this.conctactForm.resetForm(this.message);
  }

}
class TemplateMessage {
  constructor(
    public topic?: string,
    public message?: string,
    public name?: string,
    public email?: string,
    public friend = 'Olga',
    public bot?: boolean
  ) {}
}
