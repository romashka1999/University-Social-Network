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

  getPosts(id: number): Observable<GetPost_Response> {
  return  this.http.get<GetPost_Response>(`${environment.api}/public/posts/user/${id}?page=0&pageSize=20`);
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
  getFollowersPosts(): Observable<GetPost_Response> {
    return this.http.get<GetPost_Response>(`${environment.api}/public/posts/followeesPosts?page=0&pageSize=10`)
  }
}
