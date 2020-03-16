import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, Validator, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../models/User';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty &&  form.invalid ;
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

  constructor(private fb: FormBuilder,
     private authenticationService : AuthenticationService,
     private router : Router
     ) { }

  
  ngOnInit() {
    this.signupForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      gender : ['male', [Validators.required]],
      password : ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: this.passwordValidator // this is on form level , form has to valid
      }
    )
  }
     
  get f() { return this.signupForm.controls }


  onSignup(){
    if(this.signupForm.invalid)
        return;
    // oops way
    let user = new User(this.f.firstName.value, this.f.lastName.value,this.f.gender.value,this.f.email.value,this.f.password.value);
    // console.log('User * ', user);
    this.authenticationService.signup(user)
    .subscribe(res => {
        console.log('resp signup ** ', res)
        if(res.status){
            this.router.navigate(['/home']);
        }
    });
    
  }


// for matching password
  passwordValidator(form: FormGroup) {
    const condition = form.get('password').value !== form.get('confirmPassword').value;

    return condition ? { passwordsDoNotMatch: true} : false;
  }

// not needed
getErrorMessage() {        
    if (this.f.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.f.email.hasError('email') ? 'Not a valid email' : '';
  }
 


}
