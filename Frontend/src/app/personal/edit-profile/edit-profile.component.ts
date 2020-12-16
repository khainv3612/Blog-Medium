import {Component, OnInit} from '@angular/core';
import {AccountDetails} from '../../model/AccountDetails';
import {UserDetailService} from '../../service/UserDetailService';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthServiceSecu} from '../../auth/auth-service-secu.service';
import {forkJoin, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AddPostService} from '../../add-post.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {NotifierService} from 'angular-notifier';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  user: AccountDetails;
  username = '';
  birthday: any;
  urlAvatar = environment.URL_SAVE_AVATAR_FIREBASE;
  notifier: NotifierService;
  avatarUrl = '';
  checkAvatarNull = false;
  selectedAvatar = null;

  constructor(private userService: UserDetailService, private routerActive: ActivatedRoute
    , private router: Router, private authService: AuthServiceSecu, private storage: AngularFireStorage
    , private notifierService: NotifierService) {
    this.router.getCurrentNavigation().extras.state;
    this.username = history.state[0];
    this.checkIsLoginToShowData();
    this.getUserDetail().subscribe(data => {
      this.user = data;
    }, error => {
      console.log(error);
    });
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.showPreAvatar();
  }

  showPreAvatar() {
    $(document).ready(function () {

      const readURL = function (input) {
        if (input.files && input.files[0]) {
          const reader = new FileReader();

          reader.onload = function (e) {
            $('.profile-pic').attr('src', e.target.result);
          };

          reader.readAsDataURL(input.files[0]);
        }
      };

      $('.file-upload').on('change', function () {
        readURL(this);
      });

      $('.upload-button').on('click', function () {
        $('.file-upload').click();
      });
    });
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

  getUserDetail(): Observable<any> {
    const details = this.userService.getUserDeatil(this.username);
    return details;
  }

  async uploadAvatar() {
    const date = new Date();
    let dateCreateStr = '';
    dateCreateStr += date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    const filePathImage = this.urlAvatar + `${this.selectedAvatar.name.split('.').slice(0, -1).join('.')}_${dateCreateStr}` + '_' + this.username;
    const fileRefImage = this.storage.ref(filePathImage);
    await this.storage.upload(filePathImage, this.selectedAvatar).snapshotChanges().pipe(
      finalize(() => {
        fileRefImage.getDownloadURL().subscribe(url => {
          this.avatarUrl = url;
          this.user.image = this.avatarUrl;
        });
      })
    ).subscribe();
  }

  async updateAvatar(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectedAvatar = event.target.files[0];
      this.checkAvatarNull = false;
      await this.uploadAvatar();
    }
  }
}
