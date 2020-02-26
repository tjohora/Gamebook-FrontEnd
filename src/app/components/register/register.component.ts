import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //items;
  registerForm;
  registerCheck:boolean;

  //get fval() { return this.registerForm.controls; }

  constructor(private formBuilder : FormBuilder,
    private userService : UserService) {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required, Validators.maxLength(20)],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(8), Validators.maxLength(20)]
    });
   }

  ngOnInit() {
    
  }

  onSubmit(details){
    this.userService.register(details).subscribe(data => {
      console.log(data)
      this.registerCheck = data;
    });
    if(this.registerCheck){
      //success msg
      //redirect to login
    }else{
      //error msg
    }
    console.log(details);
  }


}
