import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/app/models/user';
import { Post } from '../../models/Post'
import { PostService } from '../../services/post.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  posts: Post[] = [];
  users : user[] = [];
  user : user;
  noOfPosts : number = 0;

  currentUser = this.authenticationService.currentUserValue;

  constructor(
    private authenticationService: UserService,
    private postService: PostService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.authenticationService.getUsers().subscribe( data =>
      {
        console.log(data);
        this.users = data;
        data.forEach(element => {
          if(element.userId == this.currentUser.userId){
            this.currentUser = element;
          }
        });
      });
    


    this.postService.getPosts().subscribe(posts => {
      for (var i = 0; i < posts.length; i++) {
        
        if (posts[i].userId == this.currentUser.userId) {

          this.posts.push(posts[i]);

          this.noOfPosts++;
        }
      }

    });
  }

}
