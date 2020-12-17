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
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../service/ValidationService';
import {SocialAuthService} from 'angularx-social-login';
import {ResetPass} from '../../model/ResetPass';

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
  profileForm: FormGroup;
  resetPassForm: FormGroup;
  isMatchPass: boolean = true;
  isValidUsername: boolean = true;
  isValidEmail: boolean = true;
  isValidPass: boolean = true;
  isValidRepass: boolean = true;
  validateService: ValidationService;
  isNeedCheck = false;
  isPassCorrect = true;
  idUser: number;
  resetPassDTO: ResetPass;
  isNeedCheckPass = false;


  constructor(private formBuilder: FormBuilder, private userService: UserDetailService, private routerActive: ActivatedRoute
    , private router: Router, private authService: AuthServiceSecu, private storage: AngularFireStorage
    , private notifierService: NotifierService, private validate: ValidationService) {
    this.router.getCurrentNavigation().extras.state;
    this.username = history.state[0];
    this.checkIsLoginToShowData();
    this.getUserDetail().subscribe(data => {
      this.user = data;
      this.avatarUrl = this.user.image;
      this.idUser = this.user.id;
      this.profileForm = this.formBuilder.group({
        username: [this.user.username, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
        birthday: [this.user.birthday, [Validators.required]],
        phone: [this.user.phone, [Validators.required, Validators.maxLength(12), Validators.minLength(10)]],
        address: [this.user.address, [Validators.required]],
        email: [this.user.email, [Validators.required, ValidationService.emailValidator]],
        description: [this.user.description, [Validators.required]]
      });

      this.resetPassDTO = {
        idUser: this.user.id,
        passConfirm: '',
        newPass: ''
      };
    }, error => {
      console.log(error);
    });
    this.notifier = notifierService;
    this.resetPassForm = this.formBuilder.group({
      currentpass: ['', [Validators.required]],
      newpass: ['', [Validators.required, ValidationService.passwordValidator]],
      confirmpass: ['', [Validators.required]]
    });
    this.validateService = validate;

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

  validateConfirmPass() {
    const pass = (<HTMLInputElement>document.getElementById('inputPassword')).value;
    const rePass = (<HTMLInputElement>document.getElementById('inputConfirmPassword')).value;
    if ('' != pass && '' != rePass) {
      if (pass != rePass) {
        this.isMatchPass = false;
      } else {
        this.isMatchPass = true;
      }
    }
  }

  validateProfileForm() {
    this.isValidUsername = this.profileForm.get('username').valid;
    this.isValidEmail = this.profileForm.get('email').valid;
  }

  validateResetPasForm() {
    this.isValidPass = this.resetPassForm.get('newpass').valid;
    this.isValidRepass = this.resetPassForm.get('confirmpass').valid;
    this.validateConfirmPass();
  }

  updateProfile() {
    this.isNeedCheck = true;
    this.validateProfileForm();
    if (!this.profileForm.valid) {
      return;
    }
    this.user = this.profileForm.value;
    this.user.image = this.avatarUrl;
    this.user.id = this.idUser;
    if (this.isNeedCheckPass && this.resetPassForm.valid) {
      if (confirm('Do yor want to update password, too?')) {
        this.updatePassword();
      }
    }
    this.userService.updateProfile(this.user).subscribe(result => {
      this.showNotification('success', result);
    }, error => {
      console.log(error);
      this.showNotification('error', 'Some thing went wrong!');
    });
  }

  updatePassword() {
    this.isNeedCheckPass = true;
    this.validateResetPasForm();
    if (!this.resetPassForm.valid || !this.isMatchPass) {
      return;
    }
    this.resetPassDTO.passConfirm = this.resetPassForm.get('currentpass').value;
    this.resetPassDTO.newPass = this.resetPassForm.get('newpass').value;
    this.userService.updatePass(this.resetPassDTO).subscribe(result => {
      this.showNotification('success', result);
    }, error => {
      this.showNotification('error', error.error);
      this.isNeedCheckPass = false;
    });

  }

  showNotification(type, message) {
    this.notifier.show({
      message: message,
      type: type,
    });
  }

  showHideUpdatePass() {
    const x = document.getElementById('update-pass');
    if (x.style.display === 'none') {
      x.style.display = 'block';
      if (this.resetPassForm.valid) {
        this.isNeedCheckPass = true;
      }
    } else {
      x.style.display = 'none';
      this.isNeedCheckPass = false;
    }
  }

}
