import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/sm-api/src/services/user/user.service';
import { UserDto } from 'src/sm-api/src/models/user-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  submitted = false;
  constructor(private router:Router,
              private userService:UserService,
              private formBuilder: FormBuilder,
              private toast:NgToastService) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      birthday:['',Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
  // convenience getter for easy access to form fields
   get f() { return this.registrationForm.controls; }

  //registration method
  registration():void{
    this.submitted = true;

    // stop here if form is invalid
    if (this.registrationForm.invalid) {
        return;
    }
    this.userService.addUser(this.registrationForm.value).subscribe(
        (data:any|HttpErrorResponse)=>{
         if(data instanceof HttpErrorResponse){
          this.toast.error({detail:"ERROR",summary:data.error.message,duration:4000});
         }else{
          this.toast.success({detail:"SUCCESS",summary:'Register Successfully',duration:4000});
           this.router.navigate(['login']);
         }
        }
      );

  }
}
