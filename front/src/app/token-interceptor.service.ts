import { Injectable } from '@angular/core';
// make this service implement http interceptor, this is a decorator used in class definition, not dependency
import { HttpInterceptor } from '@angular/common/http';
// using data from api
import { ApiService } from './api.service';

@Injectable()
// HttpInterceptor is a decorator forcing service to implement intercept function
export class TokenInterceptorService implements HttpInterceptor{

  constructor( private api: ApiService) { }

  // loading HTTP_INTERCEPTORS and making it plus this interceptor a provider
  // makes sure an http request is intercepted and this function is called
  // right before the request is actually sent to server
  intercept(req,next) { 
    // if service holds a token (not null, user is logged)
    if(this.api.token)  {
      // cloning the request 
      let tokenizedHeader = req.clone({
        // adding header with authorization
        setHeaders: {
          // Adding proper authorization with bearer format to header
          Authorization: `Bearer ${this.api.token}`
        }
      });
      // procvide a way to continue with operation
      return next.handle(tokenizedHeader);      
    }
    else {
      // no token, continue with the original request 
      return next.handle(req);
    }      
  }

}
