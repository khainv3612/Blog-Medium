import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterPayload} from './register-payload';
import {Observable} from 'rxjs';
import {LoginPayload} from './login-payload';
import {LoginAutResponse} from './login-aut-response';
import {map} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import {environment} from '../../environments/environment';
import {SocialAuthService} from 'angularx-social-login';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {Router} from '@angular/router';
import {AccountDetails} from '../model/AccountDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceSecu {
  private url = environment.URL_API_AUTH;
  private urlLoginGoogle = environment.URL_API_LOGIN_SOCIAL + 'signin/google';
  private urlReturn = '';


  constructor(private httpClient: HttpClient
    , private authService: SocialAuthService, private router: Router) {
    this.urlReturn = sessionStorage.getItem('urlReturn');
    if (null == this.urlReturn || this.urlReturn == '' || this.urlReturn.length == 0) {
      this.urlReturn = '/home';
    }
  }

  register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpClient.post(this.url + 'signup', registerPayload);
  }

  login(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient.post<LoginAutResponse>(this.url + 'login', loginPayload).pipe(map(data => {
      sessionStorage.setItem('authenticationToken', data.authenticationToken);
      sessionStorage.setItem('username', data.username);
      sessionStorage.setItem('role', data.role);
      let avatar = environment.URL_AVATAR_DEFAULT;
      if (data.avatar != '') {
        avatar = data.avatar;
      }
      sessionStorage.setItem('avatar', avatar);
      return true;
    }));
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('username') != null;
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

  getRole(): string {
    let role = sessionStorage.getItem('role');
    if (role == null) {
      role = 'anonymous';
    }
    return role;
  }


  logout() {
    sessionStorage.removeItem('authenticationToken');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('avatar');
    this.authService.signOut();
  }

  loginGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      const account: LoginPayload = {
        username: data.name,
        email: data.email,
        image: data.photoUrl
      };
      this.httpClient.post<string>(this.urlLoginGoogle, account, {responseType: 'text' as 'json'}).subscribe(result => {
        sessionStorage.setItem('authenticationToken', data.authorizationCode);
        sessionStorage.setItem('username', data.name);
        sessionStorage.setItem('role', result);
        sessionStorage.setItem('avatar', data.photoUrl);
        setTimeout(() => {
          this.router.navigateByUrl(this.urlReturn);
        }, 1000);
      }, error => {
        console.log(error);
        alert('ERROR! PLEASE TRY AGAIN!');
      });
    });
  }

  loginInFaceBook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data => {
      console.log(data);
      const account: LoginPayload = {
        username: data.name,
        email: data.email,
        image: data.photoUrl
      };
      this.httpClient.post<string>(this.urlLoginGoogle, account, {responseType: 'text' as 'json'}).subscribe(result => {
        sessionStorage.setItem('authenticationToken', data.authorizationCode);
        sessionStorage.setItem('username', data.name);
        sessionStorage.setItem('role', result);
        sessionStorage.setItem('avatar', data.photoUrl);
        this.router.navigateByUrl(this.urlReturn);
      }, error => {
        console.log(error);
        alert('ERROR! PLEASE TRY AGAIN!');
      });
    });
  }

  getAvatar() {
    return sessionStorage.getItem('avatar');
  }

  getUserDetails(username: string): Observable<AccountDetails> {
    return this.httpClient.post<AccountDetails>(this.url + 'profile', username);
  }
}
