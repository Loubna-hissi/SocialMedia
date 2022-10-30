import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap } from 'rxjs';
import { PostDto } from '../../models/post-dto';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  //URL
  private url='http://localhost:8080/SocialMedia/V1';

  //SUBJECT
  public planList = new Subject<void>();

  constructor(private http:HttpClient,
              ) { }

  //ALL POSTS
  getAllPosts():Observable<Array<PostDto>>{
    return this.http.get<PostDto[]>(`${this.url}/posts/findAll`).pipe(
      tap((response)=>{
        return response.sort();
    }),catchError(async (error)=>{return error})
    )
  }

  //ADD POST
  addPost(formData:FormData):Observable<PostDto>{
    const HttpOptions={
      headers:new HttpHeaders({'enctype':'multipart/form-data;boundary=--------------------------708079374480384408573475'})
    }
    return this.http.post<PostDto>(`${this.url}/posts/add`,formData,HttpOptions).pipe(
      tap((response)=>{
        this.planList.next()
        return response;
      }),catchError(async (error)=>{return error})
    )
  }

  //LIKE AND DISLIKE POST
  likeOrDislikePost(idPost:string|undefined,idCurrent:string|undefined):Observable<PostDto>{
    const HttpOptions={
      headers:new HttpHeaders({'Content-type':'application/json'})
    }
    return this.http.put<PostDto>(`${this.url}/posts/likeDislike/${idPost}/${idCurrent}`,HttpOptions).pipe(
      tap((response)=>{
        this.planList.next()
        return response;
      }),catchError(async (error)=>{return error})
    )
  }

}



