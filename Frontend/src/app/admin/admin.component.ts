import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PostPending} from '../model/post-pending';
import {PostService} from '../service/PostService.service';
import validate = WebAssembly.validate;
import {PostPayload} from '../add-post/post-payload';
import {AddPostService} from '../add-post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PostComponent} from '../post/post.component';
import {MatDialog} from '@angular/material/dialog';
import {auto} from '@popperjs/core';
import {PreviewPostComponent} from '../personal/preview-post/preview-post.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  postsPending: PostPending[];
  postPublish: PostPayload[];
  constructor(private postService: PostService, private router: Router, private routerActive: ActivatedRoute, public dialog: MatDialog
  ) {
  }

  action = '';

  ngOnInit() {
    this.routerActive.params.subscribe(params => {
      this.action = params['action'];
    });
    switch (this.action) {
      case 'review-post': {
        this.showPostPending();
        break;
      }
      case 'post-publish': {
        this.showPostPublish();
        break;
      }
    }
  }

  showPostPending() {
    this.postService.getAllPostPending().subscribe(value => {
        this.postsPending = value;
      }
    );
  }

  showPostPublish() {
    this.postService.getAllPostPublish().subscribe(value => {
        this.postPublish = value;
      }
    );
  }

  viewPostPending(post: PostPending) {
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

  viewPostPublish(post: PostPayload) {
    this.router.navigateByUrl('/post', {state: post});
  }

  publishPost(id: number) {
    this.postService.publishPost(id).subscribe(data => {
      alert('done');
      this.router.navigateByUrl('/');
    }, error => {
      alert('unsuccess');
    });
  }

  deletePost(id: number) {
    if (!confirm('Are you sure?')) {
      return;
    }
    this.postService.deletePost(id).subscribe(result => {
      alert('done');
      document.getElementById('post-' + id.toString()).hidden = true;
    }, error => {
      alert('failed');
    });
  }

  openDialog(title: string, text: string, post: any): void {
    const dialogRef = this.dialog.open(PreviewPostComponent, {
        width: '80%',
        data: post,
        height: '70%',
        // state: post
      }
    );

    dialogRef.afterClosed().subscribe(result => {
    });

    const dialogSubmitSubscription =
      dialogRef.componentInstance.submitClicked.subscribe(result => {
        dialogSubmitSubscription.unsubscribe();
      });

  }
}
