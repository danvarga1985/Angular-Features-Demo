import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  defaultQuestion = 'teacher';
  answer = '';
  genders = ['male', 'female', 'other'];

  // Alternate solution to access the form with @ViewChild - in this case there's no parameter needed for the 'onSubmit' function.
  // @ts-ignore
  @ViewChild('f') signUpForm: NgForm;

  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';

    // The 'setValue' function sets the whole form.
    // this.signUpForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'other'
    // });

    // A better approach - The 'patchValue' function is able to overwrite parts of the form, and is only available on the form.
    this.signUpForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  onSubmit(): void {
    // Bind the form
    this.submitted = true;
    this.user.username = this.signUpForm.value.userData.username;
    this.user.email = this.signUpForm.value.userData.email;
    this.user.secretQuestion = this.signUpForm.value.secret;
    this.user.answer = this.signUpForm.value.questionAnswer;
    this.user.gender = this.signUpForm.value.gender;

    // Reset the form (both the inputs and the state (properties)
    this.signUpForm.reset();
  }

  // onSubmit(form: NgForm): void {
  //   console.log(form);
  // }
}
