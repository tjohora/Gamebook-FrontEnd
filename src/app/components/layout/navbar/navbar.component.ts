import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: user;

  constructor(
    private router: Router,
    private authenticationService: UserService
    
    ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
     }

  ngOnInit() {

  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


}
