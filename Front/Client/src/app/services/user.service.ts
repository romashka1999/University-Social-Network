import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { GetUser_Response } from '../models/user.model';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) {}

  getCurrentUser() {
      return JSON.parse(atob(localStorage.getItem('st-token').split('.')[1])).user
  }

  getUserProfile(id: number): Observable<GetUser_Response> {
    return  this.http.get<GetUser_Response>(`${environment.api}/public/users/profile/${id}`);
  }

}
