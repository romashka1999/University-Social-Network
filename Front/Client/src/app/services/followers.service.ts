import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FollowersModel, IsFollowed} from '../models/followers.model';
import { environment } from '../../environments/environment'

@Injectable({providedIn: 'root'})
export class FollowersService {
  constructor(private http: HttpClient) {}

  followUser(userId: number): Observable<FollowersModel> {
   return this.http.get<FollowersModel>(`${environment.api}/public/followers/followUser/${userId}`);
  }
  unFollowUser(userId: number): Observable<FollowersModel> {
    return this.http.get<FollowersModel>(`${environment.api}/public/followers/unfollowUser/${userId}`);
  }

  isFollowed(userId: number): Observable<IsFollowed> {
    return this.http.get<IsFollowed>(`${environment.api}/public/followers/checkFollowing/${userId}`);
  }
}
