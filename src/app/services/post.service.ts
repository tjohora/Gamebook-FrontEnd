import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/Post';
import { TestBed } from '@angular/core/testing';
import { UserService } from '../services/user.service';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain'
  })
}


@Injectable({
  providedIn: 'root'
})
export class PostService {
  currentUser = this.authenticationService.currentUserValue;
  postUrl: string = 'http://localhost:8080/Year3Project/webresources/post';
  commentUrl: string = 'http://localhost:8080/Year3Project/webresources/comments';
  imageUrl: string = null;
  postImage: File = null;
  posts: Post[] = [];

  constructor(private http: HttpClient,
    private authenticationService: UserService
  ) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl);
  }

  sendPostText(details) {
    let jsonStr = JSON.stringify(details);
    return this.http.post<any>(this.postUrl, jsonStr);
  };

  getOnePost(postId) {
    let url = this.postUrl + "/onePost/" + postId;
    return this.http.get<Post[]>(url);
  }

  getCommentsOfPost(postId) {
    let url = this.commentUrl + '/commentsOfPost/' + postId;
    return this.http.get<Comment[]>(url);
  }

  postComment(details) {
    let jsonStr = JSON.stringify(details);
    return this.http.post<any>(this.commentUrl, jsonStr);
  }

  deleteComment(commentID): Observable<any> {
    let url = this.commentUrl + "/deleteComment/" + commentID;
    return this.http.put(url, "", httpOptions);
  }

  removePost(postId) {
    let url = this.postUrl + "/deletePost/" + postId;
    this.http.put(url, "", httpOptions).subscribe();
    window.location.reload();
  }

  removeComment(commentId) {
    let url = this.commentUrl + "/deleteComment/" + commentId;
    this.http.put(url, "", httpOptions).subscribe();
    window.location.reload();
  }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentUrl);
  }

  deletePost(postId) {
    let url = this.postUrl + "/deletePost/" + postId;
    return this.http.put(url, "", httpOptions);
  }

  updatePost(details, postId): Observable<any> {
    let url = this.postUrl + "/updatePost/" + postId;
    return this.http.put(url, details, httpOptions);
  }

  updateComment(details, commentId): Observable<any> {
    let url = this.commentUrl + "/updateComment/" + commentId;
    return this.http.put(url, details, httpOptions);
  }

  getOneComment(commentId) {
    let url = this.postUrl + "/oneComment/" + commentId;
    return this.http.get<Comment[]>(url);
  }

  uploadImage(image) {
    this.postImage = image;
    let url = this.postUrl + "/upload/";
    const file = new FormData();
    

    file.append('image', this.postImage,this.postImage.name);
    file.append('userId', this.currentUser.userId+ "");
    console.log(file.get('userId'));
    
    this.http.post<any>(url, file).subscribe(res=>{
      console.log(res);
    });

  }

}
