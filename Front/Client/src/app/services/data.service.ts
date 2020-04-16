import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Users} from '../shared/interfaces';
import {HttpClient} from '@angular/common/http';
import {GetUser_Response, UserSearchModel} from '../models/user.model';
import { environment } from '../../environments/environment'

@Injectable({providedIn: 'root'})
export class DataService {
  constructor(private http: HttpClient) {}
  searchResult = new Subject();

  searchUser(value: string): Observable<UserSearchModel> {
    return  this.http.get<UserSearchModel>(`${environment.api}/public/users/serachUsers?search=${value}&page=0&pageSize=10`);
  }

  getProfile(id: number): Observable<GetUser_Response> {
    return  this.http.get<GetUser_Response>(`${environment.api}/public/users/profile/${id}`);
  }
  changePhone(newPhone: string) {
   return  this.http.patch(`${environment.api}/public/users/phoneNumber`, {
     phoneNumber: newPhone
   });
  }

  changePass(oldPass: string, newPass: string) {
    return this.http.patch(`${environment.api}/public/users/password`, {
      oldPassword: oldPass,
      newPassword: newPass
    });
  }

  changeUsername(newUsername: string) {
    return this.http.patch(`${environment.api}/public/users/username`, {
      username: newUsername
    });
  }

  changeEmail(newEmail: string) {
    return this.http.patch(`${environment.api}/public/users/email`, {
      email: newEmail
    });
  }

}
