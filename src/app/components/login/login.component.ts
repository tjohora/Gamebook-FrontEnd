import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
//import { hostname } from 'os';
//import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;
  loginDetails;
  loginError: any;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    ) {
    
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  onSubmit(details) {
    this.userService.login(details).subscribe(data => {     
     if(data.hasOwnProperty('error')){
        alert("Username or password incorrect")
     }else{
       this.router.navigate(['/profile']);
      }
      
    });
  }
}
