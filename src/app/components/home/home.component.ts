import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post'
import { PostService } from '../../services/post.service';
import { JsonPipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { rating } from 'src/app/models/rating';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts:Post[];
  //ratings: rating[];
  results: JSON;
  ratingsMap;

  constructor(private postService:PostService) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });

  }
}
