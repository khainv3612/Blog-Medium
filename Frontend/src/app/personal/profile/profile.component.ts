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

  constructor(private postService: PostService, private userService: UserDetailService, private routerActive: ActivatedRoute
    , private router: Router, private authService: AuthServiceSecu) {
    this.router.getCurrentNavigation().extras.state;
    this.username = history.state[0];
    console.log(this.username);
  }

  ngOnInit(): void {
    this.checkIsLoginToShowData();
    this.getUserDetail().subscribe(data => {
      this.user = data[0];
      this.user.lstPost = data[1];
      console.log(this.user);
    }, error => {
      console.log(error);
    });
  }

  getUserDetail(): Observable<any> {
    const details = this.userService.getUserDeatil(this.username);
    const postOwner = this.postService.getAllMyPostPublished(this.username);
    return forkJoin([details, postOwner]);
  }

  checkIsLoginToShowData() {
    if (this.authService.isAuthenticated()) {
      if (undefined == this.username) {
        this.username = sessionStorage.getItem('username');
      }
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  showHideCommentArea(id: number) {
    const x = document.getElementById('comment-' + id);
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

}
