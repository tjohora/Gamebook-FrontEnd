import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/app/models/post';
import { user } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';
import { InvokeFunctionExpr } from '@angular/compiler';



@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  @Input() post : Post;
  @Output() selectedPost = new EventEmitter<Post>();
  userId: number;
  posts : Post[] = [];
  users : user[] = [];
  comments : Comment[] = [];
  selectedRow;
  numPosts : number;

  constructor(private postService : PostService, private userService : UserService) {

  }

   ngOnInit() {
  //   this.userService.getUsers().subscribe( data =>
  //     {
  //       console.log(data);
  //       this.users = data;
  //     });
  

    this.postService.getPosts().subscribe( data => 
      {
      console.log(data);
      this.posts = data;

    });

    this.postService.getComments().subscribe( data =>
      {
        console.log(data);
        this.comments = data;
      });
  }

  rowSelected(i : number)
   {
   this.selectedRow = i;
   this.selectedPost.emit(this.posts[i]);
  }

   deletePost(id : number){
     console.log("ID: " + id);
      this.postService.removePost(id);//.subscribe();
  }

  deleteComment(id : number){
    console.log("ID: " + id);
     this.postService.removeComment(id);
 }
}
