import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostPending} from '../model/post-pending';
import {environment} from '../../environments/environment';
import {saveAs} from 'file-saver';
import {AuthServiceSecu} from '../auth/auth-service-secu.service';
import {PostPayload} from '../add-post/post-payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  fileContent: string | ArrayBuffer = '';

  constructor(private httpClient: HttpClient, private authService: AuthServiceSecu) {
  }

  private url = environment.URL_API_POST;

  getAllPostPending(request): Observable<PostPending[]> {
    const params = request;
    return this.httpClient.get<PostPending[]>(this.url + 'post-pending', {params, responseType: 'json'});
  }

  getAllPostPublish(request): Observable<PostPayload[]> {
    const params = request;
    return this.httpClient.get<PostPayload[]>(this.url + 'post-publish', {params, responseType: 'json'});
  }

  publishPost(id: number) {
    return this.httpClient.post(this.url + 'publish-post', id);
  }

  deletePost(id: number) {
    return this.httpClient.post(this.url + 'delete-post', id);
  }

  getAllMyPostPublished(username): Observable<PostPayload[]> {
    return this.httpClient.post<PostPayload[]>(this.url + 'my-post/published', username);
  }

  getAllMyPostPending(username): Observable<PostPayload[]> {
    return this.httpClient.post<PostPayload[]>(this.url + 'my-post/pending', username);
  }

  countPost(request: string) {
    return this.httpClient.get<number>(this.url + 'count-post/' + request);
  }

}
