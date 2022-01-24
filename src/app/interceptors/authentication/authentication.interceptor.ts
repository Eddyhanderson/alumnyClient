import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account-service/account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService, private router: Router, private route: ActivatedRoute) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let logedIn = this.accountService.logStatus;
    let token = localStorage.getItem('token');

    if(logedIn && token !== null ){
      request = request.clone(
        {
          setHeaders:{
            Authorization : `Bearer ${token}`
          }
        }
      );      
    }

    return next.handle(request);
  }
}
