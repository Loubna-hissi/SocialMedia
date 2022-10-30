import { Component, OnInit } from '@angular/core';
import { useForkRef } from '@material-ui/core';
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

  postList!:Array<PostDto>
  currentUser!:UserDto|undefined;
  commentShow:any={}
  constructor(private postService:PostService,
              private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getConnectedUser().subscribe((data:UserDto|undefined)=>{
      this.currentUser=data
      })
    this.postService.planList.subscribe(()=>{
      this.getAllPost();
    })
    this.getAllPost();
  }
  //ALL POST
  getAllPost(){
    this.postService.getAllPosts().subscribe((data)=>{
      this.postList=data;
    })
  }
  //LIKE OR DISLIKE POST
  likeOrDislikePost(idPost:string|undefined,idUser:string|undefined){
    this.postService.likeOrDislikePost(idPost,idUser).subscribe((data)=>{
      console.log(data);
    })
  }
  //CHEKC IF THE POST IS ALREADY LIKED BY TH CURRENT USER
  isAlreadyLiked(post:PostDto):boolean{
    return post.postLikers.includes(this.currentUser?.id as string)
  }
}
