import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;

  private api:string = environment.api ;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
      return this.currentUserSubject.value;
   }

// for testing purpose
   loaderTest(){
     return this.http.get<any>(`${this.api}/auth/getUsersTest`);
   }

// register user
  signup(user : User){
      return this.http.post<any>(`${this.api}/auth/signup`, user)
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user.token));
        this.currentUserSubject.next(user);
        return user;
   }))   
  }

   login(email:string , password:string) {
     let body = {
        email : email,
        password : password
     }
      // api for login
     return this.http.post<any>(`${this.api}/auth/login`, body)  
         .pipe(map(user => {
              localStorage.setItem('currentUser', JSON.stringify(user.token));
              this.currentUserSubject.next(user.token);
              return user;
         }))   
      
   }

   // check if user log in
  public isLoggedIn(){

    if(this.currentUserValue){
           return true;
      }
    return  false;
      
   }

   logout() {
     localStorage.removeItem('currentUser');
     this.currentUserSubject.next(null);
   }
}
