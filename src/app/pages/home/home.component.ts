import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/sm-api/src/models/user-dto';
import { UserService } from 'src/sm-api/src/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public currentUser!:UserDto|undefined;
  constructor(private userService:UserService,) { }

  ngOnInit(): void {
    this.userService.getConnectedUser().subscribe((data:UserDto|undefined)=>{
      this.currentUser=data
      })
  }

}
