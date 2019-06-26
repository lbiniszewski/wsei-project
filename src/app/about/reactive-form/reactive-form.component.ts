import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  contactForm: FormGroup;

  message = new ReactiveMessage();
  friends = ['Pawel', 'Olga', 'Ryszard', 'Edyta'];

  ngOnInit() {
    this.contactForm = new FormGroup({
      topic: new FormControl(null, Validators.required),
      message: new FormControl(null, [Validators.required, Validators.minLength(50)]),
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      friend: new FormControl(this.friends[3]),
      bot: new FormControl(null),
      questions: new FormArray([new FormControl(null), new FormControl(null)], this.questionsValidator)
    });

    // this.contactForm.valueChanges.subscribe(value => {
    //   console.log(value);
    // });

    this.contactForm.get('topic').valueChanges.subscribe(value => {
      console.log(value);
    });
    this.contactForm.get('email').statusChanges.subscribe(value => {
      console.log(value);
    });

  }

  addQuestion() {
    const arr = <FormArray>this.contactForm.get('questions');
    arr.push(new FormControl(null));
  }

  questionsValidator(control: AbstractControl): ValidationErrors {
    const arr = <[string]>control.value;
    if (arr.includes('angularjs')) {
      return { forbbidenfriend: true };
    }
  }

  onSubmit() {
    this.message.topic = this.contactForm.get('topic').value; // inny sposób pobrania danych
    this.message.message = this.contactForm.value.message;
    this.message.name = this.contactForm.value.name;
    this.message.email = this.contactForm.value.email;
    this.message.friend = this.contactForm.value.friend;
    this.message.bot = this.contactForm.value.bot;
    this.onReset();
  }

  onReset() {
    this.contactForm.reset({
      friend: this.friends[3]
    });
  }
}

class ReactiveMessage {
  constructor(public topic?: string, public message?: string, public name?: string, public email?: string, public friend = 'Angular', public bot?: boolean) {}
}
