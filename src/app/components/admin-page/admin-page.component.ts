import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/app/models/post';
import { user } from 'src/app/models/user';
import { flaggedPost } from 'src/app/models/flaggedPost';
import { PostService } from 'src/app/services/post.service';
import { ConditionalExpr } from '@angular/compiler';
import { flaggedComment } from 'src/app/models/FlaggedComment';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  @Input() post: Post;
  @Output() selectedPost = new EventEmitter<Post>();
  userId: number;
  user1: user;

  releaseButton : any;
  posts: Post[] = [];
  users: user[] = [];
  flaggedPosts: flaggedPost[] = [];
  flaggedComments: flaggedComment[] = [];
  comments: Comment[] = [];

  selectedRow;
  numPosts: number;
  toggle: boolean = true;

  activePosts: number = 0;
  activeUsers: number = 0;
  activeComments: number = 0;

  removedPosts: number = 0;
  removedUsers: number = 0;
  removedComments: number = 0;

  postsToday = 0;
  postsThisWeek = 0;
  postsThisMonth = 0;

  commentsToday = 0;
  commentsThisWeek = 0;
  commentsThisMonth = 0;


  constructor(private postService: PostService, private userService: UserService) {
  }

  ngOnInit() {
    //Timeline data
    var dayAgo = new Date();
    dayAgo.setDate(dayAgo.getDate() - 1);

    var weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    var monthAgo = new Date();
    monthAgo.setDate(weekAgo.getDate() - 30);

    this.toggle = localStorage.getItem('myKey') == 'true';

    this.postService.getPosts().subscribe(data => {
      console.log("TEST: " + dayAgo.toISOString());
      console.log("TEST: " + weekAgo.toISOString());
      console.log("TEST: " + monthAgo.toISOString());
      this.posts = data;
      this.activePosts = this.posts.filter(data => data['active'] === 1).length;
      this.removedPosts = this.posts.filter(data => data['active'] === 0).length;


      this.postsToday = this.posts.filter(data => data['postDate'] >= dayAgo.toISOString() && data['active'] === 1).length;
      this.postsThisWeek = this.posts.filter(data => data['postDate'] >= weekAgo.toISOString() && data['active'] === 1).length;
      this.postsThisMonth = this.posts.filter(data => data['postDate'] >= monthAgo.toISOString() && data['active'] === 1).length;
    });

    this.postService.getComments().subscribe(data => {
      console.log(data);
      this.comments = data;
      this.activeComments = this.comments.filter(data => data['active'] === 1).length;
      this.removedComments = this.comments.filter(data => data['active'] === 0).length;

      this.commentsToday = this.comments.filter(data => data['commentDate'] >= dayAgo.toISOString() && data['active'] === 1).length;
      this.commentsThisWeek = this.comments.filter(data => data['commentDate'] >= weekAgo.toISOString() && data['active'] === 1).length;
      this.commentsThisMonth = this.comments.filter(data => data['commentDate'] >= monthAgo.toISOString() && data['active'] === 1).length;
    });

    this.userService.getUsers().subscribe(data => {
      console.log(data);
      this.users = data;
      this.activeUsers = this.users.filter(data => data['active'] === 1).length;
      this.removedUsers = this.users.filter(data => data['active'] === 0).length;
    });

    this.postService.getFlagged().subscribe(data =>{
      this.flaggedPosts = data;
    });

    this.postService.getFlaggedC().subscribe(data =>{
      this.flaggedComments = data;
    });



    //Keep current tab active on page refresh
    $(document).ready(function () {
      if (location.hash) {
        $("a[href='" + location.hash + "']").tab("show");
      }
      $(document.body).on("click", "a[data-toggle='tab']", function (event) {
        location.hash = this.getAttribute("href");
      });
    });
    $(window).on("popstate", function () {
      var anchor = location.hash || $("a[data-toggle='tab']").first().attr("href");
      $("a[href='" + anchor + "']").tab("show");
    });
  }


  rowSelected(i: number) {
    this.selectedRow = i;
    this.selectedPost.emit(this.posts[i]);
  }

  deletePost(id: number) {
    console.log("ID: " + id);
    this.postService.removePost(id);
  }

  deleteComment(id: number) {
    console.log("ID: " + id);
    this.postService.removeComment(id);
  }

  deleteUser(id: number) {
    console.log("ID: " + id);
    this.userService.removeUser(id);
  }

  change() {
    this.toggle = !this.toggle;
    localStorage.setItem('myKey', JSON.stringify(this.toggle));
  }

  releasePost(id : number){
    console.log("See ID: " + id)
    this.postService.releasePost(id);
  }

  releaseComment(id : number){
    console.log("See ID: " + id)
    this.postService.releaseComment(id);
  }
}
