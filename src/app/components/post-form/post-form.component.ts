import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postForm;
  postForm2;
  postForm3;
  postCheck;
  userId: number;
  currentUser = this.authenticationService.currentUserValue;
  


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private postService: PostService,
    private authenticationService: UserService
    ) { 
      this.postForm = this.formBuilder.group({
        userId: '',
        postHeader: ['', Validators.required],
        postContent: ['', Validators.required],
        media: ''      
      });
    }
    

    

  ngOnInit() {
    this.userId = this.currentUser.userId;
  }

  sendPostText(details){
    this.postService.sendPostText(details).subscribe(data => {
      this.postCheck = data;
      if(this.postCheck){
        this.router.navigate(['']);
      }else{
        alert('There was a problem with the upload, please try again later.')
      }
    })
  };
}
