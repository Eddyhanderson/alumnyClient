import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from 'src/app/shared/utils/constants';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(private http:HttpClient) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(map(resp=>{
      if(resp instanceof HttpResponse){
        if(resp.status == Constants.UNAUTHORIZED_STATUS_CODE || resp.status == Constants.FORBIDDEN_STATUS_CODE){
          
        }
      }
      return resp;
    }));
  }
}
