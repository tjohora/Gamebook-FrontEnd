import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts:Post[];

  constructor() { }

  ngOnInit() {
    this.posts = [{
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
        postContent: 'This is another great post!',
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
  ]
  }

}
