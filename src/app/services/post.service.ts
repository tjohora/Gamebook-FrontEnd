import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsUrl:string = 'http://localhost:8080/Year3Project/webresources/post';

  constructor(private http:HttpClient) { }

  getPosts():Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);



    /* return [
      {
        postId: 1,
          userId: 2,
          userName: 'Billy',
          postHeader: 'Billys first post',
          postContent: 'This is a post!',
          postDate: '1/2/2020',
          media: null,
          active: 1
      },
      {
        postId: 2,
          userId: 2,
          userName: 'Billy',
          postHeader: 'Billys second post post',
          postContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          postDate: '22/12/2020',
          media: null,
          active: 1
      },
      {
        postId: 3,
          userId: 3,
          userName: 'JohnJoe',
          postHeader: 'I like Cheese',
          postContent: 'I think its great!',
          postDate: '22/12/2020',
          media: null,
          active: 1
      } 
    ]*/
  }
}
