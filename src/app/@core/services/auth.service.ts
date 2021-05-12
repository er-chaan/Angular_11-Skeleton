import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api:any;
  constructor(private httpClient: HttpClient) {
    this.api = environment.api;
  }

  signin(data:any){
    var url = this.api + "login";
    return this.httpClient
      .post(url, data)
      .pipe(
        map((data: any) => {
          return data;
        })
      );  
  }

  signup(data:any){
    var url = this.api + "register";
    return this.httpClient
      .post(url, data)
      .pipe(
        map((data: any) => {
          return data;
        })
      );  
  }

}
