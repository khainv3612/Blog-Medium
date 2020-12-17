import {Component, OnInit} from '@angular/core';
import {AccountDetails} from '../../model/AccountDetails';
import {PostService} from '../../service/PostService.service';
import {UserDetailService} from '../../service/UserDetailService';
import {forkJoin, Observable} from 'rxjs';
import {Comment} from '../../model/comment';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {AuthServiceSecu} from '../../auth/auth-service-secu.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: AccountDetails;
  username = '';
  lstCmt: Comment[];
  request: any;
  pageSize = 3;
  page = 0;
  isLoading = false;
  loadedAll = false;
  isFirstLoad = true;

  constructor(private postService: PostService, private userService: UserDetailService, private routerActive: ActivatedRoute
    , private router: Router, private authService: AuthServiceSecu, private routeractive: ActivatedRoute) {
    this.routeractive.params.subscribe(params => {
      this.username = params['username'];
    });
    this.request = {
      username: this.username,
      page: this.page,
      size: this.pageSize
    };
    this.getUserDetail().subscribe(data => {
      this.user = data[0];
      this.user.lstPost = data[1];
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.handleScroll();
  }

  getUserDetail(): Observable<any> {
    const details = this.userService.getUserDeatil(this.username);
    const postOwner = this.postService.getAllMyPostPublished(this.request);
    return forkJoin([details, postOwner]);
  }


  showHideCommentArea(id: number) {
    const x = document.getElementById('comment-' + id);
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  getNextPost() {
    if (this.loadedAll) {
      return;
    }
    this.request.page++;
    this.request.size = 1;
    this.postService.getAllMyPostPublished(this.request).subscribe(res => {
      if (res.length) {
        this.user.lstPost.push(...res);
      } else {
        this.loadedAll = true;
      }
    });
  }

  handleScroll(): void {
    window.onscroll = () => this.detectBottom();
  }

  detectBottom(): void {
    const el = document.getElementById('area-content');
    if (window.innerHeight >= Math.floor(el.clientHeight + el.getBoundingClientRect().top)) {
      if (!this.loadedAll) {
        setTimeout(() => {
          this.getNextPost();
        }, 400);
      }
    }
  }

}
