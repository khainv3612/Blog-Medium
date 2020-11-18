import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthServiceSecu} from '../auth/auth-service-secu.service';
import {environment} from '../../environments/environment';
import {Comment} from '../model/comment';
import {Observable} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private httpClient: HttpClient) {
  }

  private url = environment.URL_API_COMMENT;

  addNewComment(comment: Comment): Observable<Comment> {
    const param = comment;
    return this.httpClient.post<Comment>(this.url + 'add-comment', param, {responseType: 'json'});
  }

  getComment(page, size, idPost: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.url + 'get/' + idPost + '/' + page + '/' + size);
  }

  countComment(idPost): Observable<number> {
    return this.httpClient.get<number>(this.url + 'count-comment/' + idPost);
  }
}
