import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit 
{
  comments: Comment[];
  posts: Post[];
  NoOfComments = 0;

  constructor(private route: ActivatedRoute,
    private postService: PostService) { }

  ngOnInit() 
  {
    this.route.paramMap.subscribe(params => 
    {
      
      let postId = params.get('postId');
      this.postService.getOnePost(postId).subscribe(posts => {
        this.posts = posts;
      });
      this.postService.getCommentsOfPost(postId).subscribe(comments => {
        this.comments = comments;
        this.NoOfComments = comments.length;
      });
    });
  }
}