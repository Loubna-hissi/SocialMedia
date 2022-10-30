import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { UserDto } from 'src/sm-api/src/models/user-dto';
import { UserService } from 'src/sm-api/src/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public currentUser!:UserDto|undefined;
  constructor(private router:Router,
              private userService:UserService,
             ) { }

  ngOnInit(): void {
    this.userService.getConnectedUser().subscribe((data:UserDto|undefined)=>{
      this.currentUser=data
      })
  }
  //LOGOUT FROM CLIENT SIDE
  logout():void{
   window.localStorage.removeItem("jwt")
   window.localStorage.removeItem("connectedUser")
   this.router.navigate(['/login']);
  }
}
