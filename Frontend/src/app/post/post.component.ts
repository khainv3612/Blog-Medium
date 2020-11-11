import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AddPostService} from '../add-post.service';
import {PostPayload} from '../add-post/post-payload';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {} from '../../app/material.module';
import {FacebookService, UIParams, UIResponse} from 'ngx-facebook';

// @ts-ignore
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: PostPayload;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private postService: AddPostService) {
    this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.post = history.state;
    if (this.post.title != null) {
      localStorage.setItem('post-detail', JSON.stringify(this.post));
    } else {
      this.post = JSON.parse(localStorage.getItem('post-detail'));
    }
  }

}
