import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url:string = 'http://localhost:8080/Year3Project/webresources/post';

  constructor(private http:HttpClient,
    ) { }

  getPosts():Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  sendPostText(details){
    let jsonStr = JSON.stringify(details);
    return this.http.post<any>(this.url, jsonStr);
  };

  sendPostUpload(details){

  };

  sendPostLink(details){

  };

}
