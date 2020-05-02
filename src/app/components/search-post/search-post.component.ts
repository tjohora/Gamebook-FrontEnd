import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.css']
})
export class SearchPostComponent implements OnInit {
  results: any;
  noOfPosts : number = 0;
  posts: Post[];
  searchItem;

  constructor(private route: ActivatedRoute,
    private postService: PostService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.searchItem = params.get('searchItem');
      this.postService.getSearchResults(this.searchItem).subscribe(posts => {
        this.posts = posts;
      });
    });
  }

}
