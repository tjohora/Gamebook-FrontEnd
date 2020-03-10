import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  userId: number;
  currentUser = this.authenticationService.currentUserValue;

  constructor(
    private authenticationService: UserService
  ) { }

  ngOnInit() {
    this.userId = this.currentUser.userId;
  }

}
