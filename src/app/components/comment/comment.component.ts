import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { isDefined } from '@angular/compiler/src/util';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  userId:number;
  currentUser;
  deleteCommentForm;
  commentID;
  deletecheck;

  constructor(private formBuilder: FormBuilder, 
    private authenticationService: UserService,
    private postService: PostService,)
   {this.deleteCommentForm = this.formBuilder.group({
    commentID: ''
  });

  }

  ngOnInit() {
    if(this.authenticationService.currentUserValue !== null){
      this.currentUser = this.authenticationService.currentUserValue;
      this.userId = this.currentUser.userId;
    }
    
  }

  deleteComment(commentID){
    this.postService.deleteComment(commentID).subscribe(data => {
      this.deletecheck = data;
      console.log("Response: " + this.deletecheck);
      if(this.deletecheck){
        location.reload();
      }else{
        alert("Delete unsuccessful. Try again later.")
      }
    })
  }

}
