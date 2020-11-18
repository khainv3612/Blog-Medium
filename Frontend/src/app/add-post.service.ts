import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostPayload} from './add-post/post-payload';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  constructor(private httpClient: HttpClient) {
  }

  private url = environment.URL_API_POST;

  addPost(postPayload: PostPayload) {
    return this.httpClient.post(this.url, postPayload);
  }

  getAllPosts(): Observable<PostPayload[]> {
    return this.httpClient.get<PostPayload[]>(this.url + 'all');
  }

  getPost(permaLink: Number): Observable<PostPayload> {
    return this.httpClient.get<PostPayload>(this.url + 'get/' + permaLink);
  }

  updatePost(post: PostPayload) {
    return this.httpClient.post(this.url + 'edit-post', post);
  }
}

