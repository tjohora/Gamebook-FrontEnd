import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
  commentForm: any;
  editCheck;
  comments;
  editCommentForm;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private authenticationService: UserService) { 
      this.editCommentForm = this.formBuilder.group({
        userId: '',
        postId: '',
        content: ['', Validators.required]
      });
    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {

      let commentId = params.get('commentId');
      /* this.postService.getOneComment(commentId).subscribe(comments => {
        this.comments = comments;
      }); */
    });
  }

  sendEditComment(details, commentId) {
    this.route.paramMap.subscribe(params => {

      let commentId = params.get('commentId');
      this.postService.updateComment(details, commentId).subscribe(data => {
        this.editCheck = data;
        if (this.editCheck) {
          this.router.navigate([""]);
        } else {
          alert('There was a problem with the upload, please try again later.')
        }
      })
    });
  };

}
