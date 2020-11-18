import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../model/comment';
import {FormControl, FormGroup} from '@angular/forms';
import {AddPostComponent} from '../../add-post/add-post.component';
import {ActivatedRoute, Router} from '@angular/router';
import {AddPostService} from '../../add-post.service';
import {CommentService} from '../../service/CommentService';
import {AuthServiceSecu} from '../../auth/auth-service-secu.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() lstCmt: Comment[];
  @Input() idPost: number;

  commentForm: FormGroup;
  newComment: Comment;
  body = new FormControl('');
  editorConfig = {
    theme: 'modern',
    height: '90',
    menubar: false,
    plugins:
      'emoticons wordcount'
    ,
    toolbar1: 'emoticons',
    branding: false
  };
  totalCmt = 0;
  pageSize = 3;

  constructor(private router: Router, private activatedRoute: ActivatedRoute
    , private  commentService: CommentService, private authService: AuthServiceSecu) {

    this.commentForm = new FormGroup({
      body: this.body
    });
    this.newComment = {
      id: null,
      content: '',
      username: '',
    };
  }

  ngOnInit(): void {
    this.getComment(0, this.pageSize);
    this.countComment();
  }

  countComment() {
    this.commentService.countComment(this.idPost).subscribe(result => {
      this.totalCmt = result;
    }, error => {
      console.log(error);
    });
  }

  addNewComment() {
    const comment = this.commentForm.get('body').value;
    this.newComment.content = comment;
    this.newComment.username = this.authService.getUsername();
    this.newComment.idPost = this.idPost;
    console.log(this.newComment);
    this.commentService.addNewComment(this.newComment).subscribe(result => {
      this.lstCmt.push(result);
      this.countComment();
    }, error => {
      console.log(error);
      alert('FAIL ADD NEW COMMENT');
    });
    this.commentForm.reset();
  }

  getNextComment(event: PageEvent) {
    const page = event.pageIndex.toString();
    const size = event.pageSize.toString();
    this.getComment(page, size);
  }

  getComment(page, size) {
    this.commentService.getComment(page, size, this.idPost).subscribe(result => {
      this.lstCmt = result;
      console.log(result);
    }, error => {
      console.log(error);
    });
  }

}
