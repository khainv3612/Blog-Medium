import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterPayload} from './register-payload';
import {Observable} from 'rxjs';
import {LoginPayload} from './login-payload';
import {JwtAutResponse} from './jwt-aut-response';
import {map} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.URL_API_AUTH;

  constructor(private httpClient: HttpClient, private localStoraqeService: LocalStorageService) {
  }

  register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpClient.post(this.url + 'signup', registerPayload);
  }

  login(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient.post<JwtAutResponse>(this.url + 'login', loginPayload).pipe(map(data => {
      console.log(data);
      this.localStoraqeService.store('authenticationToken', data.authenticationToken);
      this.localStoraqeService.store('username', data.username);
      this.localStoraqeService.store('role', data.role);
      return true;
    }));
  }

  isAuthenticated(): boolean {
    console.log(this.localStoraqeService)
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
    this.localStoraqeService.clear('authenticationToken');
    this.localStoraqeService.clear('username');
    this.localStoraqeService.clear('role');
  }
}
