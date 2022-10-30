import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDto } from 'src/sm-api/src/models/user-dto';
import { SharedServiceService } from 'src/sm-api/src/services/SharedService/shared-service.service';
import { UserService } from 'src/sm-api/src/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser!:UserDto|undefined
  sub!: Subscription
  imageProfile!: string | ArrayBuffer | null
  imageCover!: string | ArrayBuffer | null
  image!:File;
  isUser:boolean=false;
  profileOrCoverImageUser!:FormGroup;
  constructor(private userService:UserService,
              private route: Router,
              private formBuilder:FormBuilder,
              private sharedService: SharedServiceService) { }

  ngOnInit(): void {
    //FORM UPDATE IMAGES OF THE CURRENT USER
    this.profileOrCoverImageUser = this.formBuilder.group({
      photoProfile: [null],
      photoCover:[null]
     });
        if(this.route.url.endsWith('/notUser')){
          this.userService.userFollowingsFollowers.subscribe(()=>{
            this.shareData()
           })
           this.shareData()
        }
        else {
         this.userService.userFollowingsFollowers.subscribe(()=>{
          this.getCurrentUser()
         })
         this.getCurrentUser()
        }
    this.userService.setPhotos.subscribe(()=>{
      this.getCurrentUser()
    })
      }
    //GETCURRENTUSER
    getCurrentUser(){
      this.userService.getCurrentUser().subscribe((data:UserDto|undefined)=>{
        this.currentUser=data
        this.isUser=true;
          })
    }
    //SHARED DATA
    shareData(){
      this.sharedService.send_data.subscribe(
            data => {
              this.currentUser=data
              console.log(this.currentUser)

            }
          )
    }
    //TO EDIT THE PROFILE
    toEditProfile(){
      this.route.navigate(['/settings']);
    }
    //PREVIEW PROFILE IMAGE
    onKeyPressEventProfile(event:any):void{
      this.imageProfile=""
      const fileToUpload:File=event.target.files && event.target.files[0]
     if(fileToUpload){
         if(fileToUpload.type.indexOf('image')>-1){
           this.image=event.target.files[0]
           this.UpdateImageUser()
         }
      }
     }
    //PREVIEW PROFILE IMAGE
    onKeyPressEventCover(event:any):void{
        this.imageCover=""
        const fileToUpload:File=event.target.files && event.target.files[0]
       if(fileToUpload){
           if(fileToUpload.type.indexOf('image')>-1){
            this.image=event.target.files[0]
            this.UpdateImageUser()
           }

        }
       }
    //UPDATE USER IMAGES (PROFILE OR COVER)
    UpdateImageUser(){
      let formData = new FormData();
      console.log(this.image)
      formData.append('photoProfile',this.image as Blob);
      formData.append('photoCover',this.image as Blob);
      console.log(formData.get('photoProfile'))
      this.userService.updateUserProfileImage(formData).subscribe((data)=>{
        if(data instanceof HttpErrorResponse){
          console.log(data)
        }else{
          console.log(data)
        }
      })
      this.userService.updateUserCovertImage(formData).subscribe((data)=>{
        if(data instanceof HttpErrorResponse){
          console.log(data)
        }else{
          console.log(data)
        }
      })
    }
}
