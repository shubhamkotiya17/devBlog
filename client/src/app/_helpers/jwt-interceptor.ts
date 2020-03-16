import { HttpInterceptor , HttpRequest, HttpHandler, HttpEvent,} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(private authenticationService : AuthenticationService){}

    intercept(request: HttpRequest<any> , next: HttpHandler) :Observable<HttpEvent<any>> {
            let currentUser = this.authenticationService.currentUserValue;
            
            if(currentUser && currentUser.token){
                request = request.clone({ 
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.token}`
                    }
                })
            }
            return next.handle(request);
    }
}
