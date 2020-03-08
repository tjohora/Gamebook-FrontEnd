import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/Post';
import { TestBed } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postUrl:string = 'http://localhost:8080/Year3Project/webresources/post';
  commentUrl:string = 'http://localhost:8080/Year3Project/webresources/comments';

  constructor(private http:HttpClient,
    ) { }

  getPosts():Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl);
  }

  sendPostText(details){
    let jsonStr = JSON.stringify(details);
    return this.http.post<any>(this.postUrl, jsonStr);
  };

  sendPostUpload(details){

  };

  sendPostLink(details){

  };
  

  getOnePost(postId){
    let url = this.postUrl + "/onePost/" + postId;
    return this.http.get<Post[]>(url);
  }

  getCommentsOfPost(postId){
    let url = this.commentUrl + '/commentsOfPost/' + postId;
    return this.http.get<Comment[]>(url);
  }

  postComment(details){
    let jsonStr = JSON.stringify(details);
    return this.http.post<any>(this.commentUrl, jsonStr);
  }

}
