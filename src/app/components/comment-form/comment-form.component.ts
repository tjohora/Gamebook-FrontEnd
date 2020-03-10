import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  commentForm;
  commentCheck;
  postId;
  userId: number;
  currentUser = this.authenticationService.currentUserValue;


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private authenticationService: UserService) { 
      this.commentForm = this.formBuilder.group({
        userId: '',
        postId: '',
        content: ['', Validators.required]
      });
    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.postId = +params.get('postId');
      this.userId = this.currentUser.userId;
    });
  }

  sendComment(details){
    this.postService.postComment(details).subscribe(data => {
      this.commentCheck = data;
      if(this.commentCheck){
        location.reload();
      }else{
        alert("Comment failed to upload. Try again later.")
      }
    })
  }

}
