import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //items;
  registerForm;
  registerCheck: boolean;

  //get fval() { return this.registerForm.controls; }

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  onSubmit(details) {
    this.userService.register(details).subscribe(data => {
      //console.log("First Print: " + data)
      this.registerCheck = data;
      if (this.registerCheck) {
        this.router.navigate(['/login']);
      } else {
        alert('Username or email already in use.')
      }
    });
  }
}
