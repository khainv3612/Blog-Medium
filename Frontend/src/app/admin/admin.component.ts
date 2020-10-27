import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PostPending} from '../model/post-pending';
import {PostService} from '../service/PostService.service';
import validate = WebAssembly.validate;
import {PostPayload} from '../add-post/post-payload';
import {AddPostService} from '../add-post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  postsPending: PostPending[];

  constructor(private postService: PostService, private router: Router) {
  }

  ngOnInit() {
    this.postService.getAllPostPending().subscribe(value => {
        this.postsPending = value;
      }
    );

  }

  viewPost(post: PostPending) {
    const postView = {
      'id': post.idPending,
      'content': post.content,
      'title': post.userCreate,
      'image': post.image,
      'username': post.userCreate,
      'lastUpdate': post.lastUpdate
    };
    this.router.navigateByUrl('/post', {state: postView});
  }

  publishPost(id: string) {
    this.postService.publishPost(id).subscribe(data => {
      alert('done');
      this.router.navigateByUrl('/');
    }, error => {
      alert('unsuccess');
    });
  }

  deletePost(id: string) {
    if (!confirm('Are you sure?')) {
      return;
    }
    this.postService.deletePost(id).subscribe(result => {
      alert('done');
      this.router.navigateByUrl('/');
    }, error => {
      alert('failed');
    });
  }
}
