import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import {SocialAuthService} from 'angularx-social-login';
import {Router} from '@angular/router';
import {AuthServiceSecu} from './auth/auth-service-secu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-spring-blog-frontend';

  constructor(private localStoraqeService: LocalStorageService, private authService: AuthServiceSecu) {
    // this.authService.logout();
  }


}
