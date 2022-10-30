import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap } from 'rxjs';
import { CommentDto } from '../../models/comment-dto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  //URL
  private url='http://localhost:8080/SocialMedia/V1';
  public planList = new Subject<void>();

  constructor(private http:HttpClient) { }

  //ADD COMMENT
  addComment(formData:FormData,idPost:string|undefined):Observable<CommentDto>{
    const HttpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    return this.http.post<CommentDto>(`${this.url}/comments/add/${idPost}`,formData,HttpOptions).pipe(
      tap((response)=>{
        this.planList.next()
        return response;
      }),catchError(async (error)=>{return error})
    )
  }

  //GET ALL COMMENTS OF A POST
  getAllPostComments(idPost:string|undefined):Observable<Array<CommentDto>>{
      return this.http.get<Array<CommentDto>>(`${this.url}/comments/findAll/${idPost}`).pipe(
        tap((response)=>{
          return response;
        }),catchError(async(error)=>{return error}))
  }
}
