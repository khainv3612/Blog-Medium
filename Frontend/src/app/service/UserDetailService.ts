import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {AccountDetails} from '../model/AccountDetails';
import {PostService} from './PostService.service';
import {Router} from '@angular/router';
import {ResetPass} from '../model/ResetPass';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  private url = environment.URL_API_USER_DETAIL;

  constructor(private httpClient: HttpClient, private postService: PostService, private router: Router) {
  }

  getUserDeatil(username: string): Observable<AccountDetails> {
    return this.httpClient.post<AccountDetails>(this.url + 'get-user-detail', username);
  }

  redirectEditProfilePage(username: string) {
    this.router.navigateByUrl('/edit-profile', {state: [username]});
  }

  redirectDetailPage(username: string) {
    this.router.navigateByUrl('/profile/' + username);
  }

  updateProfile(user: AccountDetails): Observable<string> {
    return this.httpClient.post<string>(this.url + 'update-profile', user, {responseType: 'text' as 'json'});
  }
  updatePass(resetPass: ResetPass): Observable<string> {
    return this.httpClient.post<string>(this.url + 'update-pass', resetPass, {responseType: 'text' as 'json'});
  }
}
