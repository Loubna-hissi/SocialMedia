import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../../models/authentication-response';

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor{
  authenticationResponse!: AuthenticationResponse;

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(localStorage.getItem('jwt')){
          this.authenticationResponse=JSON.parse(
          localStorage.getItem('jwt') as string
        )
      const authReq=req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authenticationResponse.jwt}`
         }
        })

      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
