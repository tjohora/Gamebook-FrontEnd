import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editProfile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
  
})
export class editProfileComponent implements OnInit {
  //items;
  editProfileForm;
  editCheck: boolean;

  

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) {
    this.editProfileForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      address: ['', Validators.required],
      dob: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  onSubmit(details) {

                    this.userService.editUserDetails(details).subscribe(data => {
                    this.editCheck = data;
                    if(this.editCheck){
            
                    location.reload();
                    }else{
                    alert('There was a problem with the upload, please try again later.')
                    }
                    })};
}
