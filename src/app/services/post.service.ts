import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/Post';
import { TestBed } from '@angular/core/testing';
import { UserService } from '../services/user.service';
import { rating } from '../models/rating';
import { flaggedPost } from '../models/FlaggedPost';
import { flaggedComment } from '../models/FlaggedComment';

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
  ratingUrl: string = 'http://localhost:8080/Year3Project/webresources/Rating';
  flaggedPUrl: string = 'http://localhost:8080/Year3Project/webresources/FlaggedPost';
  flaggedCUrl: string = 'http://localhost:8080/Year3Project/webresources/FlaggedComment';

  // postUrl: string = 'http://localhost:25876/Year3Project/webresources/post';
  // commentUrl: string = 'http://localhost:25876/Year3Project/webresources/comments';
  // ratingUrl: string = 'http://localhost:25876/Year3Project/webresources/Rating';
  // flaggedPUrl: string = 'http://localhost:25876/Year3Project/webresources/FlaggedPost';
  // flaggedCUrl: string = 'http://localhost:25876/Year3Project/webresources/FlaggedComment';

  imageUrl: string = null;
  postImage: File = null;
  posts: Post[] = [];
  this: any;

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
    })}


// ---------RATINGS----------

  ratePost(details){
    let url = this.ratingUrl + "/updateRating"
    return this.http.post<any>(url, details);
  }

  getRatings(){
    let url = this.ratingUrl + "/getAllPostRatings";
    return this.http.get<rating>(url);
  }

  getRatingOfPost(postId){
    let url = this.ratingUrl + "/getRatingByPostID/" + postId;
    return this.http.get<rating[]>(url);
  }

  getSearchResults(searchItem){
    return this.http.get<Post[]>(this.postUrl + "/getPostBySearch/" + searchItem);
  }

  // ---------FLAGGED POSTS----------

  reportPost(details){
    let url = this.flaggedPUrl + "/reportPost"
    return this.http.post<any>(url, details);
  }

  getFlagged(): Observable<flaggedPost[]>{
let url = this.flaggedPUrl + "/getAllFlaggedPosts"
    return this.http.get<flaggedPost[]>(url);
  }

  releasePost(postId){
    let url = this.flaggedPUrl + "/releasePost/" + postId;
    console.log("THIS ::: " + url)
    this.http.get(url).subscribe((s) => {
      console.log(s)
    })
    window.location.reload();
  }

  // ---------FLAGGED COMMENTS----------

  reportComment(details){
    let url = this.flaggedCUrl + "/reportComment"
    return this.http.post<any>(url, details);
  }


  getFlaggedC(): Observable<flaggedComment[]>{
let url = this.flaggedCUrl + "/getAllFlaggedComments"
    return this.http.get<flaggedComment[]>(url);
  }

  releaseComment(commentId){
    let url = this.flaggedCUrl + "/releaseComment/" + commentId;
    console.log("THIS ::: " + url)
    this.http.get(url).subscribe((s) => {
      console.log(s)
    })
     window.location.reload();
  }
}
