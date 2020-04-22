import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/Post';
import { TestBed } from '@angular/core/testing';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain'
  })
}


@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  postUrl:string = 'http://localhost:8080/Year3Project/webresources/post';
  commentUrl:string = 'http://localhost:8080/Year3Project/webresources/comments';

  posts : Post[] = [];

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

  deleteComment(commentID):Observable<any>{
    let url = this.commentUrl + "/deleteComment/" + commentID;
    return this.http.put(url, "", httpOptions);
  }

  removePost(postId)
  {
    console.log("POST ID: " + postId);   
     let url = this.postUrl + "/deletePost/" + postId;
     console.log(url);
     //return this.http.put(this.postUrl,"/deletePost/", postId)
     return this.http.put(url,this.posts);
    // let jsonStr = JSON.stringify(postId);
    // console.log("String: " + jsonStr)
    // return this.http.put<any>(this.postUrl, jsonStr);
  }

  removeComment(commentId)
   {
     console.log("Comment ID: " + commentId);
      let url = this.commentUrl + "/deleteComment/" + commentId;
      console.log(url);
      return this.http.get<Comment[]>(url);
      //return this.http.put(this.commentUrl,"/deleteComment/", commentId)
  }

  getComments():Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentUrl);
  }

  deletePost(postId)
  {
    let url = this.postUrl + "/deletePost/" + postId;
    return this.http.put(url, "", httpOptions);
  }

  updatePost(details, postId):Observable<any> {
    let url = this.postUrl + "/updatePost/" + postId;
    return this.http.put(url, details, httpOptions);
  }

}
