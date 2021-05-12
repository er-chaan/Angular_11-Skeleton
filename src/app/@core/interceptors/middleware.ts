import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Middleware implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const API_KEY: string = '1234567890';
        const token: string = sessionStorage.getItem('token');
        httpRequest = httpRequest.clone({ headers: httpRequest.headers.set('Authorization', 'Bearer ' + token) });
        httpRequest = httpRequest.clone({ headers: httpRequest.headers.set('Content-Type', 'application/json') });
        httpRequest = httpRequest.clone({ headers: httpRequest.headers.set('Accept', 'application/json') });
        return next.handle(httpRequest.clone({ setHeaders: { API_KEY } }));  
    }

}