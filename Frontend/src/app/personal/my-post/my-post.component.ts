import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostService} from '../../service/PostService.service';
import {PostPayload} from '../../add-post/post-payload';
import {AddPostService} from '../../add-post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthServiceSecu} from '../../auth/auth-service-secu.service';
import {NotifierService} from 'angular-notifier';
import {ValidationService} from '../../service/ValidationService';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent implements OnInit {
  myPosts: PostPayload[] = [];
  typepost = '';
  username = '';
  titlePage = '';
  notifier: NotifierService;
  pageSize = 3;
  page = 0;
  request: any;
  isLoading = false;
  loadedAll = false;
  isFirstLoad = true;

  constructor(private httpClient: HttpClient, private postService: PostService
    , private routeractive: ActivatedRoute, private router: Router, private authService: AuthServiceSecu
    , private notifierService: NotifierService, private validatesv: ValidationService) {
    this.notifier = notifierService;
    this.username = this.authService.getUsername();
    this.request = {
      username: this.username,
      page: this.page,
      size: this.pageSize
    };
  }

  ngOnInit(): void {
    this.routeractive.params.subscribe(params => {
      this.typepost = params['type-post'];
    });
    switch (this.typepost) {
      case 'published':
        this.postService.getAllMyPostPublished(this.request).subscribe(data => {
          this.myPosts = data;
        });
        this.titlePage = 'Published';
        break;
      case 'pending':
        this.postService.getAllMyPostPending(this.request).subscribe(data => {
          this.myPosts = data;
        });
        this.titlePage = 'Pending';
        break;
    }

    this.handleScroll();
  }

  viewPost(post: PostPayload) {
    switch (this.typepost) {
      case 'published': {
        this.router.navigateByUrl('/post', {state: post});
        break;
      }
      case 'pending': {
        this.openDialog(post);
        break;
      }
    }

  }

  editPost(post: PostPayload) {
    this.router.navigateByUrl('/admin/edit-post', {state: post});
  }

  deletePost(id: number) {
    if (confirm('Are you sure?')) {
      this.postService.deletePost(id).subscribe(result => {
        this.showNotification('success', this.validatesv.delete_success);
        document.getElementById('post-' + id.toString()).hidden = true;
      }, error => {
        this.showNotification('error', this.validatesv.delete_unsuccess);
        console.log(error);
      });
    }
  }

  openDialog(post: any): void {
    this.postService.openDialog(post);

  }

  showNotification(type, message) {
    this.notifier.show({
      message: message,
      type: type,
    });
  }


  nextPage() {
    if (this.loadedAll) {
      return;
    }
    this.request.page++;
    this.request.size = 1;
    switch (this.typepost) {
      case 'pending': {
        this.postService.getAllMyPostPending(this.request).subscribe(res => {
          if (res.length) {
            this.myPosts.push(...res);
          } else {
            this.loadedAll = true;
          }
        });
        break;
      }
      case 'published': {
        this.postService.getAllMyPostPublished(this.request).subscribe(res => {
          if (res.length) {
            this.myPosts.push(...res);
          } else {
            this.loadedAll = true;
          }
        });
        break;
      }
    }
  }

  handleScroll(): void {

    window.onscroll = () => this.detectBottom();
  }

  detectBottom(): void {
    const el = document.getElementById('area-content');
    if (window.innerHeight >= Math.floor(el.clientHeight + el.getBoundingClientRect().top)) {
      if (!this.loadedAll) {
        setTimeout(() => {
          this.nextPage();
        }, 400);
      }
    }
  }

}
