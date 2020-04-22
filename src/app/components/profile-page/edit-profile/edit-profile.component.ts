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
  userId: number;
  editProfileForm;
  editCheck: boolean;
  currentUser = this.userService.currentUserValue;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) {
    this.editProfileForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      address: ['', Validators.required],
      dob: ['', Validators.required],
      userId: [this.currentUser.userId]
    });
  }

  ngOnInit() {
    
  }

  get f() { return this.editProfileForm.controls; }

  onSubmit(details) {
    console.log(details);
    this.userService.editUserDetails(details).subscribe(data => {

      this.editCheck = data;

      this.currentUser.fname = this.f.fname.value;
      this.currentUser.lname = this.f.lname.value;
      this.currentUser.address = this.f.address.value;
      this.currentUser.dob = this.f.dob.value;

      if (this.editCheck) {

        
      } else {
        alert('There was a problem with the upload, please try again later.')
      }
    })
  };
}
