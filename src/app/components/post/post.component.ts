import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserDto } from 'src/sm-api/src/models/user-dto';
import { PostService } from 'src/sm-api/src/services/post/post.service';
import { UserService } from 'src/sm-api/src/services/user/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
 values = ''
 showMore = false
 imageSrc!: string | ArrayBuffer | null
 format?:string;
 postForm!:FormGroup;
 image!:File|null;
 video!:File|null;
 currentUser!:UserDto|undefined;
 datePost=new Date();
 submitted = false;

  constructor(private formBuilder:FormBuilder,
              private userService:UserService,
              private postService:PostService,
              private toast:NgToastService) { }

  ngOnInit(): void {
    this.userService.getConnectedUser().subscribe((data:UserDto|undefined)=>{
      this.currentUser=data
      })

    this.postForm = this.formBuilder.group({
      description: [''],
      video: [null],
      photo:[null]
  });
  }
  //SHOW MORE/SHOW LESS PARAGRAPHE
  onShow(){
    this.showMore = !this.showMore
  }
  //upload file
  onKeyPressEvent(event:any):void{
   this.imageSrc=""
   const fileToUpload:File=event.target.files && event.target.files[0]
  if(fileToUpload){
      if(fileToUpload.type.indexOf('image')>-1){
        this.format='image'
        this.image=event.target.files[0]

      }else if(fileToUpload.type.indexOf('video')>-1){
        this.format='video'
        this.video=event.target.files[0]
      }
      const reader = new FileReader();
      reader.readAsDataURL(fileToUpload);
      reader.onload = (e)=> {this.imageSrc = (<FileReader>e.target).result};
   }
  }

  get f() { return this.postForm.controls; }

  //ADD POST
  addPost():void{
    this.submitted = true;
    // stop here if form is invalid
    if (this.postForm.invalid) {
        return;
    }
    else{
      let formData = new FormData();
      formData.append('description',this.postForm.get('description')?.value)
      formData.append('photo',this.image as Blob)
      formData.append('video',this.video as Blob)
      this.postService.addPost(formData).subscribe((data)=>{
        if(data instanceof HttpErrorResponse){
          this.toast.warning({detail:"WARNING",summary:data.error.message,duration:4000});
          console.log(this.postForm.value)
          return;
        }
        console.log(data)
        this.postForm.reset();
      })
    }
  }
  //CANCEL ADDING POST
  cancelAddingPost(){
    this.postForm.get('description')?.setValue('');
    this.postForm.get('video')?.setValue(null);
    this.postForm.get('photo')?.setValue(null);
    this.video=null;
    this.image=null;
  }
}
