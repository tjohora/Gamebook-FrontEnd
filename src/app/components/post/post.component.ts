import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/Post'
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { rating } from 'src/app/models/rating';
import { flaggedPost } from 'src/app/models/flaggedPost';
import { IfStmt, ThrowStmt } from '@angular/compiler';
import { flaggedComment } from 'src/app/models/FlaggedComment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  userId: number;
  currentUser;
  deletecheck;
  details: any;
  upvotecheck: any;
  flaggedCheck: any;
  flaggedCCheck: any;
  ratingsMap: Map<any, any>;
  flaggedMap: Map<any, any>;
  flaggedCMap: Map<any, any>;
  checkFlagged: 1;
  checkFlagged2 : 2;
  friends: any[];
  bool: boolean = true;


  constructor(private authenticationService: UserService,
    private router: Router,
    private postService: PostService) { }

  ngOnInit() {
    if (this.authenticationService.currentUserValue !== null) {
      this.currentUser = this.authenticationService.currentUserValue;
      this.userId = this.currentUser.userId;
    }
    this.postService.getRatings().subscribe(ratings => {
      this.ratingsMap = new Map();

      for (let k in ratings) {
        this.ratingsMap.set(ratings[k]["postId"], ratings[k]["selectedRating"]);
      }
    });

    this.postService.getFlagged().subscribe(flaggedPosts => {
      this.flaggedMap = new Map();

      for (let fp in flaggedPosts) {
        this.flaggedMap.set(flaggedPosts[fp]["postId"], flaggedPosts[fp]["flagPost"]);
      }
    });

    
    this.postService.getFlaggedC().subscribe(flaggedComments => {
      this.flaggedCMap = new Map();

      for (let fc in flaggedComments) {
        this.flaggedCMap.set(flaggedComments[fc]["commentId"], flaggedComments[fc]["flagComment"]);
      }
    });

    this.authenticationService.getFriendsList(this.currentUser.userId).subscribe(data => {

      
      for (var i = 0; i < data.length; i++) {
        
        this.friends = data;
        if(data[i]==this.post.userId){
          this.bool = false
        }
        
      }


    })


  }

  flagged(userId, postId, flagPost) {
    this.details = new flaggedPost(postId, userId, flagPost);
    let jsonStr = JSON.stringify(this.details);
    this.postService.reportPost(jsonStr).subscribe(data => {
      this.flaggedCheck = data;
      if (this.flaggedCheck) {
        location.reload();
      } else {
        alert("No Joy!")
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
      } else {
        alert("No Joy!")
      }
    })
  }

  deletePost(postId) {
    this.postService.deletePost(postId).subscribe(data => {
      this.deletecheck = data;
      console.log("Response: " + this.deletecheck);
      if (this.deletecheck) {
        this.router.navigate(['']);
      } else {
        alert("Delete unsuccessful. Try again later.")
      }
    })
  }

  rating(userId, postId, selectedRating) {
    this.details = new rating(postId, userId, selectedRating);
    let jsonStr = JSON.stringify(this.details);
    console.log(jsonStr);
    this.postService.ratePost(jsonStr).subscribe(data => {
      this.upvotecheck = data;
      if (this.upvotecheck) {
        location.reload();
      } else {
        alert("Voting problem. Try again later.")
      }
    })
  }
  addFriend(friendId){
    // console.log(userId)
   this.authenticationService.addFriend(this.currentUser.userId, friendId)
   location.reload();
  }

}
