import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { GetPost_Response } from '../models/post.model';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(id: number, page: number): Observable<GetPost_Response> {
    console.log('page size:', page)
  return  this.http.get<GetPost_Response>(`${environment.api}/public/posts/user/${id}?page=${page}&pageSize=10`);
  }
  createPost(data: string): Observable<GetPost_Response> {
    return this.http.post<GetPost_Response>(`${environment.api}/public/posts`, {content: data}
    );
  }
  deletePost(id: number) {
    return this.http.delete<void>(`${environment.api}/public/posts/${id}`);
  }
  editPost(id: number) {
    return this.http.put<void>(`${environment.api}/public/posts/${id}`, {

    });
  }
  getFollowersPosts(page: number): Observable<GetPost_Response> {
    return this.http.get<GetPost_Response>(`${environment.api}/public/posts/followeesPosts?page=${page}&pageSize=10`);
  }
  reactPost(PostId: number): Observable<any> {
    return this.http.get(`${environment.api}/public/postReacts/react/${PostId}`);
  }
  unReactPost(PostId: number): Observable<any> {
    return this.http.get(`${environment.api}/public/postReacts/unreact/${PostId}`);
  }
}
