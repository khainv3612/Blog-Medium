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

@Injectable({
  providedIn: 'root'
})
export class AuthServiceSecu {
  private url = environment.URL_API_AUTH;
  private urlLoginGoogle = environment.URL_API_LOGIN_SOCIAL + 'signin/google';

  constructor(private httpClient: HttpClient, private localStoraqeService: LocalStorageService
    , private authService: SocialAuthService, private router: Router) {
  }

  register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpClient.post(this.url + 'signup', registerPayload);
  }

  login(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient.post<LoginAutResponse>(this.url + 'login', loginPayload).pipe(map(data => {
      console.log(data);
      this.localStoraqeService.store('authenticationToken', data.authenticationToken);
      this.localStoraqeService.store('username', data.username);
      this.localStoraqeService.store('role', data.role);
      return true;
    }));
  }

  isAuthenticated(): boolean {
    return this.localStoraqeService.retrieve('username') != null;
  }

  getRole(): string {
    let role = this.localStoraqeService.retrieve('role');
    if (role == null) {
      role = 'anonymous';
    }
    return role;
  }


  logout() {
    this.authService.signOut();
    this.localStoraqeService.clear('authenticationToken');
    this.localStoraqeService.clear('username');
    this.localStoraqeService.clear('role');
  }

  loginGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      const account: LoginPayload = {
        username: data.name,
        email: data.email,
        image: data.photoUrl
      };
      this.httpClient.post<string>(this.urlLoginGoogle, account, {responseType: 'text' as 'json'}).subscribe(result => {
        this.localStoraqeService.store('authenticationToken', data.authorizationCode);
        this.localStoraqeService.store('username', data.name);
        this.localStoraqeService.store('role', result);
        this.router.navigateByUrl('/home');
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
        this.localStoraqeService.store('authenticationToken', data.authorizationCode);
        this.localStoraqeService.store('username', data.name);
        this.localStoraqeService.store('role', result);
        this.router.navigateByUrl('/home');
      }, error => {
        console.log(error);
        alert('ERROR! PLEASE TRY AGAIN!');
      });
    });
  }


}
