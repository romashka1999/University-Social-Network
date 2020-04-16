import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FollowersModel, IsFollowed} from '../models/followers.model';

@Injectable({providedIn: 'root'})
export class FollowersService {
  constructor(private http: HttpClient) {}

  followUser(id: number): Observable<FollowersModel> {
   return this.http.get<FollowersModel>(`http://localhost:3000/public/followers/followUser/${id}`);
  }
  unFollowUser(id: number): Observable<FollowersModel> {
    return this.http.get<FollowersModel>(`http://localhost:3000/public/followers/unfollowUser/${id}`);
  }

  isFollowed(id: number): Observable<IsFollowed> {
    return this.http.get<IsFollowed>(`http://localhost:3000/public/followers/checkFollowing/${id}`);
  }
}
