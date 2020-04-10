import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Posts} from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(id: number) {
  return  this.http.get(`http://localhost:3000/public/posts/user/${id}?page=0&pageSize=20`);
  }
  createPost(data: string) {
    return this.http.post(`http://localhost:3000/public/posts`, data
    );
  }
  deletePost(id: number) {
    return this.http.delete<void>(`http://localhost:3000/public/posts/${id}`);
  }

  editPost(id: number) {
    return this.http.put<void>(`http://localhost:3000/public/posts/${id}`, {

    });
  }
  getFolloweesPosts() {
    return this.http.get(`http://localhost:3000/public/posts/followeesPosts?page=0&pageSize=10`)
  }
}
