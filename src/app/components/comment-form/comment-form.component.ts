import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  commentForm;
  commentCheck;
  postId;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService) { 
      this.commentForm = this.formBuilder.group({
        userId: '',
        postId: '',
        content: ['', Validators.required]
      });
    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.postId = +params.get('postId');
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
