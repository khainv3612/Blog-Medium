import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostService} from '../../service/PostService.service';
import {PostPayload} from '../../add-post/post-payload';
import {AddPostService} from '../../add-post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent implements OnInit {
  myPosts: PostPayload[] = [];

  constructor(private httpClient: HttpClient, private postService: PostService, private router: Router) {
  }

  ngOnInit(): void {
    this.postService.getAllMyPost().subscribe(data => {
      this.myPosts = data;
    });
  }
  viewPost(post: PostPayload) {
    this.router.navigateByUrl('/post', {state: post});
  }


}
