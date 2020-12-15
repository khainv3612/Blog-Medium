import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {AccountDetails} from '../model/AccountDetails';
import {PostService} from './PostService.service';
import {Router} from '@angular/router';

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

  redirectDetailPage(username: string) {
    this.router.navigateByUrl('/profile', {state: [username]});
  }
}
