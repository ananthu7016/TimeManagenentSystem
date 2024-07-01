import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Interceptor');

     // first we need to get the token from our local storage 
     const token = localStorage.getItem('Token');

     // injecting token to request
     const newRequest = request.clone({
       setHeaders:{
         Authorization:`Bearer ${token}`
       }
     });
 
     return next.handle(newRequest);
  }
}
