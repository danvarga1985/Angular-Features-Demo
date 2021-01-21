import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {log} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female', 'other'];
  /*
   With the template-driven approach the 'ngForm' is just an automatically created wrapper for a 'FormGroup'.
   A form is a group of controls.
  */
  signUpForm: FormGroup;
  forbiddenUsernames = ['Taiwan', 'Hong Kong', 'Tibet'];

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      // Controls are key-value pairs.
      // A FormGroup can contain another FormGroup.
      'userData': new FormGroup({
        /*
         A. Validator functions should be only passed as parameter, not actually called.
         B. 'forbiddenNames' has to be bound to this class, because the function gets called from outside, and at that time 'this' will
         refer to an other class.
        */
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      // Wrapping the properties in '' is not necessary, but is a safety-measure so that the property will be kept.
      'gender': new FormControl('male'),
      // FormArray holds an array of controls.
      'hobbies': new FormArray([])
    });

    // 'setValue' function sets the values for the whole form.
    this.signUpForm.setValue({
      'userData': {
        'username': 'Ernst',
        'email': 'ernst@junger.com'
      },
      'gender': 'male',
      'hobbies': []
    });

    // 'patchValue' function sets values for part of the form.
    this.signUpForm.patchValue({
      'userData': {
        'username': 'Knut',
        'email': 'ernst@junger.com'
      }
    });

    // Change of state of the form is accessible by subscribing to it, since its and observable.
    // this.signUpForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );

    // this.signUpForm.statusChanges.subscribe(
    //   (status) => console.log(status)
    // );
  }

  onSubmit(): void {
    console.log(this.signUpForm);
  }

  onAddHobby(): void {
    // The value is provided by the user, hence the null value.
    const control = new FormControl(null, Validators.required);

    // Casting to Array is needed to ensure access to the 'push' function.
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  /*
   A. Custom validator-function.
   B. Return JS object - key-value pair(string-boolean).
  */
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    /*
    A. User input is invalid
    B. indexOf returns -1 if element is not in the list
    */
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    /*
     A. User input is valid.
     B. If validation is successful return value has to be nothing or null.
     C. Return shouldn't be {'nameIsForbidden': false}.
    */
    return null;
  }

  // Async validation (simulation of waiting for a server to validate user input)
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
          if (control.value === 'test@test.com') {
            resolve({'emailIsForbidden': true});
          } else {
            resolve(null);
          }
        }, 1500
      );
    });

    return promise;
  }
}
