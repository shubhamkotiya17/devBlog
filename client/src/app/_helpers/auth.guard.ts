import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
              private router:Router,
              private authentiationService:AuthenticationService
    ){

  }
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
     const currentUser = this.authentiationService.currentUserValue;
     if(currentUser){
      return true;

     }
     this.router.navigate(['/login']);
    return false;
  }
  
}
