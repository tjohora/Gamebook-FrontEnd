import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { isDefined } from '@angular/compiler/src/util';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { flaggedComment } from 'src/app/models/FlaggedComment';

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
  flaggedCMap: Map<any, any>;
  details: any;
  flaggedCCheck: any;

  constructor(private formBuilder: FormBuilder, 
    private authenticationService: UserService,
    private postService: PostService)
   {this.deleteCommentForm = this.formBuilder.group({
    commentID: ''
  });

  }

  ngOnInit() {
    if(this.authenticationService.currentUserValue !== null){
      this.currentUser = this.authenticationService.currentUserValue;
      this.userId = this.currentUser.userId;
    }

        this.postService.getFlaggedC().subscribe(flaggedComments => {
      this.flaggedCMap = new Map();

      for (let fc in flaggedComments) {
        this.flaggedCMap.set(flaggedComments[fc]["commentId"], flaggedComments[fc]["flagComment"]);
      }
    })
  }

  flaggedC(userId, commentId, flagComment) {
    this.details = new flaggedComment(commentId, userId, flagComment);
    let jsonStr = JSON.stringify(this.details);
    this.postService.reportComment(jsonStr).subscribe(data => {
      this.flaggedCCheck = data;
      if (this.flaggedCCheck) {
        location.reload();
        console.log("TEST : " + this.flaggedCCheck)
      } else {
        alert("No Joy!")
      }
    })
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
