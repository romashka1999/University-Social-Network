import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Users} from '../shared/interfaces';
import {HttpClient} from '@angular/common/http';
import {GetUser_Response, UserSearchModel} from '../models/user.model';

@Injectable({providedIn: 'root'})
export class DataService {
  constructor(private http: HttpClient) {}
  searchResult = new Subject();

  searchUser(value: string): Observable<UserSearchModel> {
    return  this.http.get<UserSearchModel>(`http://localhost:3000/public/users/serachUsers?search=${value}&page=0&pageSize=10`);
  }

  getProfile(id: number): Observable<GetUser_Response> {
    return  this.http.get<GetUser_Response>(`http://localhost:3000/public/users/profile/${id}`);
  }
  changePhone(newPhone: string) {
   return  this.http.patch(`http://localhost:3000/public/users/phoneNumber`, {
     phoneNumber: newPhone
   });
  }

  changePass(oldPass: string, newPass: string) {
    return this.http.patch(`http://localhost:3000/public/users/password`, {
      oldPassword: oldPass,
      newPassword: newPass
    });
  }

  changeUsername(newUsername: string) {
    return this.http.patch(`http://localhost:3000/public/users/username`, {
      username: newUsername
    });
  }

  changeEmail(newEmail: string) {
    return this.http.patch(`http://localhost:3000/public/users/email`, {
      email: newEmail
    });
  }

}
