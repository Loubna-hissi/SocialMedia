import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/sm-api/src/services/user/user.service';
import { AuthenticationResponse } from 'src/sm-api/src/models/authentication-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!:FormGroup;
  submitted = false;

  constructor(private router:Router,
              private userService:UserService,
              private formBuilder: FormBuilder,
              private toast:NgToastService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,
                 Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
              ],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login():void{
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.userService.authentication(this.loginForm.value).subscribe(
      (data:AuthenticationResponse|HttpErrorResponse)=>{
      if(data instanceof HttpErrorResponse){
        this.toast.error({detail:"ERROR",summary:data.error.message,duration:4000});
       }else{
         this.userService.setConnectedUser(this.loginForm.value.email).subscribe((data)=>{
          this.toast.success({detail:"SUCCESS",summary:'Login Successfully',duration:4000});
         })
         this.router.navigate([''])
       }
    });
  }
}
