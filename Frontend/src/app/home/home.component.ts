import {Component, OnInit} from '@angular/core';
import {AddPostService} from '../add-post.service';
import {Observable} from 'rxjs';
import {PostPayload} from '../add-post/post-payload';
import {Route, Router} from '@angular/router';
import {FacebookService, UIParams, UIResponse} from 'ngx-facebook';
import {UserDetailService} from '../service/UserDetailService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: PostPayload[];
  page = 1;
  itemsPerPage = 2;
  itemsPerPageOption = [1, 2, 3, 4, 5];

  constructor(private postService: AddPostService, private router: Router, private userService: UserDetailService) {
  }

  ngOnInit() {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data;
    });

  }

  viewPost(post: PostPayload) {
    this.router.navigateByUrl('/post', {state: post});
  }

  redirectDetailPage(comment: string) {
    this.userService.redirectDetailPage(comment);
  }

}
