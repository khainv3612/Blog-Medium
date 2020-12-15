import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostPending} from '../model/post-pending';
import {environment} from '../../environments/environment';
import {saveAs} from 'file-saver';
import {AuthServiceSecu} from '../auth/auth-service-secu.service';
import {PostPayload} from '../add-post/post-payload';
import {PreviewPostComponent} from '../personal/preview-post/preview-post.component';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  fileContent: string | ArrayBuffer = '';

  constructor(private httpClient: HttpClient, private authService: AuthServiceSecu, public dialog: MatDialog) {
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

  getAllMyPostPublished(request): Observable<PostPayload[]> {
    return this.httpClient.post<PostPayload[]>(this.url + 'my-post/published', request);
  }

  getAllMyPostPending(request: any): Observable<PostPayload[]> {
    return this.httpClient.post<PostPayload[]>(this.url + 'my-post/pending', request);
  }

  countPost(request: string) {
    return this.httpClient.get<number>(this.url + 'count-post/' + request);
  }

  openDialog(post: any): void {
    const dialogRef = this.dialog.open(PreviewPostComponent, {
        width: '80%',
        data: post,
        height: '70%',
        // state: post
      }
    );

    dialogRef.afterClosed().subscribe(result => {
    });

    const dialogSubmitSubscription =
      dialogRef.componentInstance.submitClicked.subscribe(result => {
        dialogSubmitSubscription.unsubscribe();
      });

  }


}
