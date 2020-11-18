import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginPayload} from '../login-payload';
import {AuthServiceSecu} from '../auth-service-secu.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {SocialAuthService} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPayload: LoginPayload;
  urlLoginGoogle = environment.URL_API_LOGIN_SOCIAL + 'signin/google';

  constructor(private authService: AuthServiceSecu, private router: Router, private authService1: SocialAuthService) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
    this.loginPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit() {
    this.authService1.authState.subscribe((user) => {
      // this.user = user;
      // this.loggedIn = (user != null);
    });
  }

  onSubmit() {
    this.loginPayload.username = this.loginForm.get('username').value;
    this.loginPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginPayload).subscribe(data => {
      if (data) {
        console.log('login success');
        this.router.navigateByUrl('/home');
      } else {
        console.log('Login failed');
      }
    });
  }

  loginGoogle() {
    this.authService.loginGoogle();
  }

  loginGaceBook() {
    this.authService.loginInFaceBook();
  }
}
