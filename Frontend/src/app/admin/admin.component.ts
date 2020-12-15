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
import {PageEvent} from '@angular/material/paginator';
import {NotifierService} from 'angular-notifier';
import {ValidationService} from '../service/ValidationService';
import {SocialAuthService} from 'angularx-social-login';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  postsPending: PostPending[];
  postPublish: PostPayload[];
  totalElements = 0;
  loading: boolean;
  pageSize = 3;
  notifier: NotifierService;
  validateService: ValidationService;

  constructor(private postService: PostService, private router: Router, private routerActive: ActivatedRoute, public dialog: MatDialog
    , private notifierService: NotifierService, private validatesv: ValidationService) {
    this.validateService = validatesv;
    this.notifier = notifierService;
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
    this.countPost();
  }

  showPostPending() {
    const request = {};
    request['page'] = 0;
    request['size'] = this.pageSize;
    this.postService.getAllPostPending(request).subscribe(value => {
        this.postsPending = value;
      }
    );
  }

  showPostPublish() {
    this.postService.getAllPostPublish({page: '0', size: this.pageSize}).subscribe(value => {
        this.postPublish = value;
      }
    );
  }

  viewPostPending(post: PostPending) {
    const postView = {
      'id': post.idPending,
      'content': post.content,
      'title': post.title,
      'image': post.image,
      'username': post.userCreate,
      'lastUpdate': post.lastUpdate
    };
    this.postService.openDialog(postView);
  }

  viewPostPublish(post: PostPayload) {
    this.postService.openDialog(post);
  }

  publishPost(id: number) {
    this.postService.publishPost(id).subscribe(data => {
      this.showNotification('success', this.validateService.publish_success);
      this.countPost();
      document.getElementById('post-' + id.toString()).hidden = true;
    }, error => {
      this.showNotification('error', this.validateService.delete_unsuccess);
    });
  }

  deletePost(id: number) {
    if (!confirm('Are you sure?')) {
      return;
    }
    this.postService.deletePost(id).subscribe(result => {
      this.showNotification('success', this.validateService.delete_success);
      this.countPost();
      document.getElementById('post-' + id.toString()).hidden = true;
    }, error => {
      this.showNotification('error', this.validateService.delete_unsuccess);
    });
  }

  openDialog(post: PostPending): void {
    const postView = {
      'id': post.idPending,
      'content': post.content,
      'title': post.title,
      'image': post.image,
      'username': post.userCreate,
      'lastUpdate': post.lastUpdate
    };
    this.postService.openDialog(postView);

  }

  private getPostPending(request) {
    // this.loading = true;
    this.postService.getAllPostPending(request)
      .subscribe(data => {
        this.postsPending = data;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  private getPostPublish(request) {
    // this.loading = true;
    this.postService.getAllPostPublish(request)
      .subscribe(data => {
        this.postPublish = data;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  nextPage(event: PageEvent, action: string) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    switch (action) {
      case 'pending': {
        this.getPostPending(request);
        break;
      }
      case 'publish': {
        this.getPostPublish(request);
        break;
      }
    }

  }

  countPost() {
    this.postService.countPost(this.action).subscribe(data => {
      this.totalElements = data;
    }, error => {
      console.log(error);
    });
  }

  showNotification(type, message) {
    this.notifier.show({
      message: message,
      type: type,
    });
  }
}
