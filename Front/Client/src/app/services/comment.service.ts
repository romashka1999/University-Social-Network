import {Observable} from 'rxjs';
import {GetCommentModel} from '../models/comment.model';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getPostComment(PostId: number, page: number): Observable<GetCommentModel> {
    return this.http.get<GetCommentModel>(`${environment.api}/public/comments/post/${PostId}?page=${page}&pageSize=5`);
  }
  addPostComment(PostId: number, content: string): Observable<GetCommentModel> {
    return this.http.post<GetCommentModel>(`${environment.api}/public/comments/post/${PostId}`, {
      content
    });
  }
  delPostComment(PostId: number, commentId: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}/public/comments/post/${PostId}/comment/${commentId}`);
  }

}
