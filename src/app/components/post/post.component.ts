import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/Post'
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  userId:number;
  currentUser;
  deletecheck;

  constructor(private authenticationService: UserService,
    private router: Router,
    private postService: PostService) {}

  ngOnInit() 
  {
    if(this.authenticationService.currentUserValue !== null)
    {
      this.currentUser = this.authenticationService.currentUserValue;
      this.userId = this.currentUser.userId;
    }
  }

  deletePost(postId){
    this.postService.deletePost(postId).subscribe(data => {
      this.deletecheck = data;
      console.log("Response: " + this.deletecheck);
      if(this.deletecheck){
        this.router.navigate(['']);        
      }else{
        alert("Delete unsuccessful. Try again later.")
      }
    })
  }
}
