import {Observable} from 'rxjs';
import {GetCommentModel, PostCommentModel} from '../models/comment.model';
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
  addPostComment(PostId: number, content: string): Observable<PostCommentModel> {
    return this.http.post<PostCommentModel>(`${environment.api}/public/comments/post/${PostId}`, {
      content
    });
  }

}
