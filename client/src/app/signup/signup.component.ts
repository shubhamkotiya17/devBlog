import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, Validator, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid ;
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  password:string="";
  signupForm:FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      gender : ['', Validators.required],
      password : ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: this.passwordValidator
      }
    )
  }
     
  get f() { return this.signupForm.controls }

// for matching password
  passwordValidator(form: FormGroup) {
    const condition = form.get('password').value !== form.get('confirmPassword').value;

    return condition ? { passwordsDoNotMatch: true} : null;
  }

// not needed
getErrorMessage() {        
    if (this.f.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.f.email.hasError('email') ? 'Not a valid email' : '';
  }
 


}
