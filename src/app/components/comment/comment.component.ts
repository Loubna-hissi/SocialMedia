import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { CommentDto } from 'src/sm-api/src/models/comment-dto';
import { CommentService } from 'src/sm-api/src/services/comment/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  commentForm!:FormGroup;

  @Input()
  idPost!:string|undefined;
  postComments!:Array<CommentDto>;

  constructor(private formBuilder:FormBuilder,
              private commentService:CommentService,
              private toast:NgToastService
              ) { }

  ngOnInit(): void {
    this.commentService.planList.subscribe(()=>{
      this.getAllPostComments()
    })
     this.getAllPostComments();
    this.commentForm = this.formBuilder.group({
      contenu:['']
    })
  }

  //ADD COMMENT TO A POST
  addComment(){
    this.commentService.addComment(this.commentForm.value,this.idPost).subscribe(data=>{
      if(data instanceof HttpErrorResponse){
        this.toast.warning({detail:"WARNING",summary:data.error.message,duration:4000});
        console.log(data)
        return;
      }else{
        this.commentForm.get('contenu')?.setValue('');
      }
    });
  }
  // GET ALL COMMENT TO A POST
  getAllPostComments(){
    this.commentService.getAllPostComments(this.idPost).subscribe(data=>{
        this.postComments=data;
        console.log(data)
    })
  }
}
