import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostDto } from 'src/sm-api/src/models/post-dto';
import { UserDto } from 'src/sm-api/src/models/user-dto';
import { PostService } from 'src/sm-api/src/services/post/post.service';
import { UserService } from 'src/sm-api/src/services/user/user.service';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit {
  postsList!:Array<PostDto>|undefined;
  showMore=false;
  currentUser!:UserDto|undefined;
  hiddeItems:any={}
  islikePost:any={}
  constructor(private postService:PostService,
              private userService:UserService
              ) { }

  ngOnInit(): void {
    //SHOW ALL POST
    this.postService.planList.subscribe(()=>{
        this.getALLPosts();
    })
    this.getALLPosts();
    //GET CURRENT USER
    this.userService.getConnectedUser().subscribe((data:UserDto|undefined)=>{
      this.currentUser=data
      })
  }

   //TEXT LENGTH SHOWING
  onShow(){
    this.showMore = !this.showMore
  }

  //GET ALL POSTS
  private getALLPosts(){
    this.postService.getAllPosts().subscribe(
      (data)=>{this.postsList=data
       }
      )
  }

  //LIKE OR DISLIKE POST
  likeOrDislikePost(idPost:string|undefined){
    this.postService.likeOrDislikePost(idPost,this.currentUser?.id).subscribe(
     (data)=>{
      console.log(data)
     });
  }

  //VERIFY IF THE POST IS LIKED
  isLikedPost(post:PostDto):boolean{
    return post.postLikers.includes(this.currentUser?.id as string);
  }

}
