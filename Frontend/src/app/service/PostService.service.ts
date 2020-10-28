import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostPending} from '../model/post-pending';
import {environment} from '../../environments/environment';
import {saveAs} from 'file-saver';
import {AuthService} from '../auth/auth.service';
import {PostPayload} from '../add-post/post-payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  fileContent: string | ArrayBuffer = '';

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  private url = environment.URL_API_POST;

  getAllPostPending(): Observable<PostPending[]> {
    return this.httpClient.get<PostPending[]>(this.url + 'post-pending', {responseType: 'json'});
  }

  readContentBlogPending(file: Blob) {
    const fileReader: FileReader = new FileReader();
    const self = this;
    fileReader.onloadend = function (x) {
      self.fileContent = fileReader.result;
    };
    fileReader.readAsText(file);
  }

  publishPost(id: number) {
    return this.httpClient.post(this.url + 'publish-post', id);
  }

  deletePost(id: number) {
    return this.httpClient.post(this.url + 'delete-post', id);
  }

  getAllMyPostPublished(): Observable<PostPayload[]> {
    return this.httpClient.get<PostPayload[]>(this.url + 'my-post/published');
  }

  getAllMyPostPending(): Observable<PostPayload[]> {
    return this.httpClient.get<PostPayload[]>(this.url + 'my-post/pending');
  }

}
