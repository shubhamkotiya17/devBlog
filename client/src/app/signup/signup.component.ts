import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, Validator, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  password:string="";
  signupForm:FormGroup;

  ngOnInit() {
    this.signupForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      gender : ['', Validators.required],
      password : ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
    
  get f() { return this.signupForm.controls }
   
  getErrorMessage() {    
    if (this.f.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.f.email.hasError('email') ? 'Not a valid email' : '';
  }
 


}
