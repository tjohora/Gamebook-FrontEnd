import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/app/models/user';
import { Post } from '../../models/Post'
import { PostService } from '../../services/post.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  posts: Post[] = [];
  users: user[] = [];
  user: user;
  noOfPosts: number = 0;
  selectedFile = null;
  currentUser = this.authenticationService.currentUserValue;
  friends: any[];
  friendDetails: user[] =[];

  constructor(
    private authenticationService: UserService,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit() {

    console.log(this.currentUser.userId);
    this.authenticationService.getUserDetails(this.currentUser.userId).subscribe(data =>
      {
        console.log(this.currentUser.userId);
        console.log(data);
        this.currentUser=data;
      })



    this.authenticationService.getFriendsList(this.currentUser.userId).subscribe(data => {

      
      for (var i = 0; i < data.length; i++) {
        
        this.friends = data;

        this.authenticationService.getUserDetails(this.friends[i]).subscribe(data =>
          {
            this.friendDetails.push(data);
            
            
          })
      }


    })

    this.postService.getPosts().subscribe(posts => {
      for (var i = 0; i < posts.length; i++) {

        if (posts[i].userId == this.currentUser.userId) {

          this.posts.push(posts[i]);

          this.noOfPosts++;
        }
      }

    });
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

  onUpload() {


    this.authenticationService.uploadImage(this.selectedFile);
    this.router.navigate(["/profile"]);
  }

  getUserDetails(id) {

    return this.authenticationService.getUserDetails(id).subscribe(data =>
      {
        return data
      })}


}
