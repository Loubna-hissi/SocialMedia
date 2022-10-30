import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap,of, Subject } from 'rxjs';
import { UserDto } from 'src/sm-api/src/models/user-dto';
import { AuthenticationResponse } from '../../models/authentication-response';
import { AutheticationRequest } from '../../models/authetication-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //URL
  private url='http://localhost:8080/SocialMedia/V1';
  currentUser!:UserDto;
  public userFollowingsFollowers = new Subject<void>();
  public setPhotos=new Subject<void>();

  constructor(private http: HttpClient,
              private router:Router) { }


  //ADD USER
  addUser(userDto:UserDto):Observable<any|HttpErrorResponse>{
      const HttpOptions={
        headers:new HttpHeaders({'Content-type':'application/json'})
      }
      return this.http.post(`${this.url}/register`,userDto,HttpOptions).pipe(
        tap((response)=>console.log(response)),
        catchError(async (error) =>{ return error})
      );
  }

  //AUTHENTICATION
  authentication(authenticationRequest:AutheticationRequest):Observable<AuthenticationResponse|HttpErrorResponse>{
    const HttpOptions={
      headers:new HttpHeaders({'Content-type':'application/json'})
    }
    return this.http.post<AuthenticationResponse>(`${this.url}/authenticate`,authenticationRequest,HttpOptions).pipe(
      tap((response:AuthenticationResponse)=>{
        return localStorage.setItem("jwt",
        JSON.stringify(response));
      }),
      catchError(async (error) =>{ return error})
    );
  }
  //SET CONNECTED USER
  setConnectedUser(email:string):Observable<UserDto>{
    return this.http.get<UserDto>(`${this.url}/users/find/${email}`).pipe(
      tap( (response:UserDto)=>{
        localStorage.setItem("connectedUser",
        JSON.stringify(response));
      }),
      catchError(async (error) =>{ return error})
    )
  }
  //Get CURRENT USER
  getCurrentUser():Observable<UserDto>{
    return this.http.get<UserDto>(`${this.url}/users/currentUser`).pipe(tap((response)=>{
      return response
    }),catchError(async (error)=>{return error})
    )
  }

  getConnectedUser():Observable<UserDto>{
    return new Observable(observer => {
      setInterval(() => {
          observer.next(JSON.parse(localStorage.getItem('connectedUser')as string))
      });
    });
  }
  //GET USER BY ID
  getUserById(id:string):Observable<UserDto>{
    return this.http.get<UserDto>(`${this.url}/users/${id}`).pipe(tap((response)=>{
      return response
    }),catchError(async (error)=>{return error})
    )
  }
  //GET ALL USERS
  getAllUser():Observable<Array<UserDto>>{
    return this.http.get<Array<UserDto>>(`${this.url}/users/findAll`).pipe(tap((response)=>{
      return response
    }),catchError(async (error)=>{return error})
    )
  }
  //FOLLOW
  follow(id:string):Observable<UserDto>{
    const HttpOptions={
      headers:new HttpHeaders({'Content-type':'application/json'})
    }
    return this.http.put<UserDto>(`${this.url}/users/addFollowerFollowing/${id}`,HttpOptions).pipe(
      tap((response)=>{
        this.userFollowingsFollowers.next()
        return response;
      }),catchError(async (error)=>{return error})
    )
  }
  //UNFOLLOW
  unfollow(id:string|undefined):Observable<UserDto>{
    const HttpOptions={
      headers:new HttpHeaders({'Content-type':'application/json'})
    }
    return this.http.put<UserDto>(`${this.url}/users/removeFollowerFollowing/${id}`,HttpOptions).pipe(
      tap((response)=>{
        this.userFollowingsFollowers.next();
        return response;
      }),catchError(async (error)=>{return error})
    )
  }
  //CONNECTION VERIFICATION
  isAccessTokenExist():boolean|Promise<boolean>{
    return localStorage.getItem('jwt') ? true:
    this.router.navigate(['/login']);
  }
  //UPDATE USER
  updateUser(formData:FormData){
    const HttpOptions={
      headers:new HttpHeaders({'Content-type':'application/json'})
    }
    return this.http.put<UserDto>(`${this.url}/users/update`,formData,HttpOptions).pipe(
      tap((response)=>{
        return response;
      }),catchError(async (error)=>{return error})
    )
  }
  //uPDATE USER PHOTO
  updateUserProfileImage(formData:FormData){
    const HttpOptions={
      headers:new HttpHeaders({'enctype':'multipart/form-data;boundary=--------------------------708079374480384408573475'})
    }
    return this.http.put<UserDto>(`${this.url}/users/profileImage`,formData,HttpOptions).pipe(
      tap((response)=>{
        this.setPhotos.next();
        return response;
      }),catchError(async (error)=>{return error})
    )
  }
  //uPDATE USER PHOTO
  updateUserCovertImage(formData:FormData){
      const HttpOptions={
        headers:new HttpHeaders({'enctype':'multipart/form-data;boundary=--------------------------708079374480384408573475'})
      }
      return this.http.put<UserDto>(`${this.url}/users/coverImage`,formData,HttpOptions).pipe(
        tap((response)=>{
          this.setPhotos.next();
          return response;
        }),catchError(async (error)=>{return error})
      )
    }
}
