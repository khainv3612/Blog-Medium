import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginPayload} from '../login-payload';
import {AuthServiceSecu} from '../auth-service-secu.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {SocialAuthService} from 'angularx-social-login';
import {NotifierService} from 'angular-notifier';
import {LocalStorageService} from 'ngx-webstorage';
import {ValidationService} from '../../service/ValidationService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPayload: LoginPayload;
  urlLoginGoogle = environment.URL_API_LOGIN_SOCIAL + 'signin/google';
  urlReturn = '';
  isValidUsername: boolean = true;
  isValidPass: boolean = true;
  validateService: ValidationService;
  notifier: NotifierService;

  constructor(private authService: AuthServiceSecu, private router: Router, private authService1: SocialAuthService
    , private localStoraqeService: LocalStorageService, private notifierService: NotifierService,
              private validate: ValidationService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.loginPayload = {
      username: '',
      password: ''
    };
    this.urlReturn = this.localStoraqeService.retrieve('urlReturn');
    if (null == this.urlReturn || this.urlReturn == '' || this.urlReturn.length == 0) {
      this.urlReturn = '/home';
    }
    this.validateService = validate;
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.authService1.authState.subscribe((user) => {
      // this.user = user;
      // this.loggedIn = (user != null);
    });
  }

  onSubmit() {
    this.validateForm();
    this.loginPayload.username = this.loginForm.get('username').value;
    this.loginPayload.password = this.loginForm.get('password').value;
    if (!this.loginForm.valid) {
      console.log('Error;');
      return;
    }
    this.authService.login(this.loginPayload).subscribe(data => {
      if (data) {
        console.log('login success');
        this.router.navigateByUrl(this.urlReturn);
      }
    }, error => {
      console.log('Login failed');
      this.showNotification('error', 'Username or password is incorrect');
    });
  }

  loginGoogle() {
    this.authService.loginGoogle();
  }

  loginGaceBook() {
    this.authService.loginInFaceBook();
  }

  validateForm() {
    if (!this.loginForm.get('username').valid) {
      this.isValidUsername = false;
    } else {
      this.isValidUsername = true;
    }

    if (!this.loginForm.get('password').valid) {
      this.isValidPass = false;
    } else {
      this.isValidPass = true;
    }
  }

  showNotification(type, message) {
    this.notifier.show({
      message: message,
      type: type,
    });
  }
}
