import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/app/models/user';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: user;
  searchForm;
  searchItem;

  constructor(
    private router: Router,
    private authenticationService: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.searchForm = this.formBuilder.group({
      searchItem: ['', Validators.required]
    })
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  ngOnInit() {

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  sendSearch(searchBar){
    this.router.navigate(["/search/" + searchBar.searchItem])
  }


}
