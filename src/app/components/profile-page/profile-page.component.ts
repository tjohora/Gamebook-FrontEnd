import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/app/models/user';
import { Post } from '../../models/Post'
import { PostService } from '../../services/post.service';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  posts:Post[];
  
  currentUser = this.authenticationService.currentUserValue;

  constructor(
    private authenticationService: UserService,
    private postService:PostService
  ) { }

  ngOnInit() {
    
    
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

}
