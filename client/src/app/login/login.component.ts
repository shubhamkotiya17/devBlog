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
  constructor(private fb:FormBuilder,
    private authenticationService:AuthenticationService,
    private router:Router) { 
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

  loaderTest(){
      this.authenticationService.loaderTest()
      .subscribe(test => console.log(test))
  }

  get f() { return this.loginForm.controls ; }

  onLogin(){
      this.authenticationService.login(this.f.email.value, this.f.password.value)
      .subscribe(res => {
            // console.log('response of login api * ', res);
            if(res.status){
              this.router.navigate(['/home'])
            }else{
                console.log(`error occured !!`);
                
            }
      });
  }

}
