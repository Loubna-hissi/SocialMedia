import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { UserDto } from 'src/sm-api/src/models/user-dto';
import { SharedServiceService } from 'src/sm-api/src/services/SharedService/shared-service.service';
import { UserService } from 'src/sm-api/src/services/user/user.service';

@Component({
  selector: 'app-rightbar',
  templateUrl: './rightbar.component.html',
  styleUrls: ['./rightbar.component.css']
})
export class RightbarComponent implements OnInit {

  currentUser!:UserDto
  currentUserNew!:UserDto
  allUsers!:Array<UserDto>
  constructor(private userService:UserService,
              private sharedService: SharedServiceService,
              private router:Router) { }

  ngOnInit(): void {
    // this.userService.userFollowingsFollowers.subscribe(()=>{
    //   this.getAllUsers();
    //   })
    this.userService.getConnectedUser().subscribe((data:UserDto)=>{
      this.currentUser=data
      });
       //SHOW ALL POST
    this.userService.userFollowingsFollowers.subscribe(()=>{
      this.getCurrentUser();
    })
    this.getAllUsers();
    this.getCurrentUser();
  }

  //GET ALL USER
  getAllUsers(){
    this.userService.getAllUser().subscribe((data)=>{
        this.allUsers=data;
    })
  }
    //GET ALL USER
    getCurrentUser(){
      this.userService.getCurrentUser().subscribe((data)=>{
        this.currentUserNew=data;
      })
    }
  //FOLLOW
  follow(id:string|undefined){
    this.userService.follow(id as string).subscribe((data)=>{
      console.log(data)
    });
  }
  //UNFOLLOW
  unfollow(id:string|undefined){
    this.userService.unfollow(id as string).subscribe((data)=>{
      console.log(data)

    });
  }
  //VERIFY IF A USER IS A FOLLOWER OR A FOLLOWING
  isAFollowing(id:string|undefined):boolean{
   return this.currentUserNew?.followings?.includes(id as string) as boolean
  }
  //SEND DATA TO PROFILE PAGE
  sendData(user:UserDto){
    this.sharedService.send_data.next(user)
  }

}
