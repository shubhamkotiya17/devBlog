import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private fb:FormBuilder,private authenticationService:AuthenticationService,private router:Router) { 
      if(this.authenticationService.currentUserValue){
        this.router.navigate(['/home'])
      }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email : ['',Validators.required],
      password : ['', Validators.required]
    });
  }

  

  onLogin(){
    
  }

}
