import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  posts: Post[];
  postForm;
  userId;
  currentUser: any;
  editPostForm: any;
  postCheck: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private postService: PostService) {
    this.editPostForm = this.formBuilder.group({
      userId: '',
      postHeader: ['', Validators.required],
      postContent: ['', Validators.required],
      media: ''
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {

      let postId = params.get('postId');
      this.postService.getOnePost(postId).subscribe(posts => {
        this.posts = posts;
      });
    });
  }

  sendEditPostForm(details, postId) {
    this.route.paramMap.subscribe(params => {

      let postId = params.get('postId');
      this.postService.updatePost(details, postId).subscribe(data => {
        this.postCheck = data;
        if (this.postCheck) {
          this.router.navigate(["/commentList/" + postId]);
        } else {
          alert('There was a problem with the upload, please try again later.')
        }
      })
    });
  };

}
