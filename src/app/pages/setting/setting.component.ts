import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/sm-api/src/services/user/user.service';
import { AuthenticationResponse } from 'src/sm-api/src/models/authentication-response';
import { NgToastService } from 'ng-angular-popup';
import { UserDto } from 'src/sm-api/src/models/user-dto';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  public UpdateUserForm!:FormGroup;
  submitted = false;


  constructor(private router:Router,
              private userService:UserService,
              private formBuilder: FormBuilder,
              private toast:NgToastService) { }

  ngOnInit(): void {
    this.UpdateUserForm = this.formBuilder.group({
      school: [''],
      job: [''],
      gender: [''],
      bio:[''],
      familyStituation: [''],
  });
  }
  // convenience getter for easy access to form fields
  get f() { return this.UpdateUserForm.controls; }

  updateUser():void{
    this.submitted = true;
    // stop here if form is invalid
    if (this.UpdateUserForm.invalid) {
        return;
    }
    console.log(this.UpdateUserForm.value)

    this.userService.updateUser(this.UpdateUserForm.value).subscribe(
      (data:AuthenticationResponse|HttpErrorResponse)=>{
      if(data instanceof HttpErrorResponse){
        console.error(data)
        this.toast.error({detail:"ERROR",summary:data.error.message,duration:4000});
       }else{
         this.toast.success({detail:"SUCCESS",summary:'Your profile is Successfully editing',duration:4000});
         this.router.navigate(['/profil']);
       }
    });
  }
  //CANCEL EDITING PROFILE
  cancelEditing(){
    this.router.navigate(['/profil'])
  }
}
