import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostService} from '../../service/PostService.service';
import {PostPayload} from '../../add-post/post-payload';
import {AddPostService} from '../../add-post.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent implements OnInit {
  myPosts: PostPayload[] = [];
  typepost = '';

  constructor(private httpClient: HttpClient, private postService: PostService
    , private routeractive: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.routeractive.params.subscribe(params => {
      this.typepost = params['type-post'];
    });
    switch (this.typepost) {
      case 'published':
        this.postService.getAllMyPostPublished().subscribe(data => {
          this.myPosts = data;
        });
        break;
      case 'pending':
        this.postService.getAllMyPostPending().subscribe(data => {
          this.myPosts = data;
        });
        break;
    }
  }

  viewPost(post: PostPayload) {
    this.router.navigateByUrl('/post', {state: post});
  }

  editPost(post: PostPayload) {
    this.router.navigateByUrl('/admin/edit-post', {state: post});
  }

  deletePost(id: number) {
    if (confirm('Are you sure?')) {
      this.postService.deletePost(id).subscribe(result => {
        alert('deleted');
        document.getElementById('post-' + id.toString()).hidden = true;
      }, error => {
        alert('failed');
      });
    }
  }

}
