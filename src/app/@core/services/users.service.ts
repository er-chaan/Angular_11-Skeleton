import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  api:any;
  headers:any;
  constructor(private httpClient: HttpClient) {
    this.api = environment.api;
    this.headers = new HttpHeaders({
      'token': sessionStorage.getItem("token")  ,
      //     'Authorization': 'Bearer '+this.access_token,
      //     'Accept' : 'application/json',
      //     'content-type' : 'application/json'
    });
  }

  unknown(){
    var url = this.api + "unknown";
    return this.httpClient
      .get(url, this.headers)
      .pipe(
        map((data: any) => {
          return data;
        })
      );  
  }

  getUsers(){
    var url = this.api + "users";
    return this.httpClient
      .get(url, this.headers)
      .pipe(
        map((data: any) => {
          return data;
        })
      );  
  }

  deleteUser(id){
    var url = this.api + "users" + "/" + id;
    return this.httpClient
      .delete(url, this.headers)
      .pipe(
        map((data: any) => {
          return data;
        })
      );  
  }

  updateUser(data:any){
    var url = this.api + "users";
    return this.httpClient
      .patch(url, data, this.headers)
      .pipe(
        map((data: any) => {
          return data;
        })
      );  
  }  

  createUser(data:any){
    var url = this.api + "users";
    return this.httpClient
      .post(url, data, this.headers)
      .pipe(
        map((data: any) => {
          return data;
        })
      );  
  }

}
