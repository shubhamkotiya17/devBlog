import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, Validator } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  password:string="";
  confirmPassword:string="";
  ngOnInit() {
  }

  signupForm = this.fb.group({
    email : ['', Validators.required],
    firstName : ['', Validators.required],
    lastName : ['', Validators.required],
    gender : ['', Validators.required],
    password : ['', Validators.required]
  });


}
