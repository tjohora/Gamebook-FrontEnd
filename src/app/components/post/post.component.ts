import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/Post'
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { rating } from 'src/app/models/rating';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  userId:number;
  currentUser;
  deletecheck;
  details: any;
  upvotecheck: any;
  ratingsMap: Map<any, any>;

  constructor(private authenticationService: UserService,
    private router: Router,
    private postService: PostService) {}

  ngOnInit() 
  {
    if(this.authenticationService.currentUserValue !== null)
    {
      this.currentUser = this.authenticationService.currentUserValue;
      this.userId = this.currentUser.userId;
    }
    this.postService.getRatings().subscribe(ratings => {
      //console.log(ratings);
      this.ratingsMap = new Map();

      for(let k in ratings) {
        this.ratingsMap.set(ratings[k]["postId"],ratings[k]["selectedRating"]);
      }
      //console.log("Test");
      //console.log(this.ratingsMap);
    });
  }

  deletePost(postId){
    this.postService.deletePost(postId).subscribe(data => {
      this.deletecheck = data;
      console.log("Response: " + this.deletecheck);
      if(this.deletecheck){
        window.location.reload();       
      }else{
        alert("Delete unsuccessful. Try again later.")
      }
    })
  }

  rating(userId, postId, selectedRating){
    this.details = new rating(postId, userId, selectedRating);
    let jsonStr = JSON.stringify(this.details);
    console.log(jsonStr);
    this.postService.ratePost(jsonStr).subscribe(data => {
      this.upvotecheck = data;
      if(this.upvotecheck){
        location.reload();
      }else{
        alert("Voting problem. Try again later.")
      }
    })
    
    


  }
  addFriend(friendId){
     // console.log(userId)
    this.authenticationService.addFriend(this.currentUser.userId, friendId)

    
  }
}
