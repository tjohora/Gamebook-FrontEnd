import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient,  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  url: string = "http://localhost:8080/Year3Project/webresources/user";

  register(details){
    let reg = this.url + "/register"
    let jsonStr = JSON.stringify(details);
    console.log(jsonStr);
    return this.http.post<any>(reg, jsonStr);
  }

  login(details){
    let reg = this.url + "/login"
    let jsonStr = JSON.stringify(details);
    console.log(jsonStr);
    return this.http.post<any>(reg, jsonStr);
  }



}
