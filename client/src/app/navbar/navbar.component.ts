import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn:boolean=false;
  constructor(
              private router : Router,
              private authenticationService : AuthenticationService
    ) {
           this.isLoggedIn = this.authenticationService.isLoggedIn()
   }

  ngOnInit() {
  }

  login(){
        this.router.navigate(['/login']);
  }

  logout(){
      this.authenticationService.logout(); // clear session
      this.login();
  }
}
