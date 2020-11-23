import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostService} from '../../service/PostService.service';
import {PostPayload} from '../../add-post/post-payload';
import {AddPostService} from '../../add-post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthServiceSecu} from '../../auth/auth-service-secu.service';
import {NotifierService} from 'angular-notifier';
import {ValidationService} from '../../service/ValidationService';

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

  constructor(private httpClient: HttpClient, private postService: PostService
    , private routeractive: ActivatedRoute, private router: Router, private authService: AuthServiceSecu
    , private notifierService: NotifierService, private validatesv: ValidationService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.routeractive.params.subscribe(params => {
      this.typepost = params['type-post'];
    });
    switch (this.typepost) {
      case 'published':
        this.postService.getAllMyPostPublished(this.username).subscribe(data => {
          this.myPosts = data;
        });
        this.titlePage = 'Published';
        break;
      case 'pending':
        this.postService.getAllMyPostPending(this.username).subscribe(data => {
          this.myPosts = data;
        });
        this.titlePage = 'Pending';
        break;
    }
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
}
