import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Users} from '../shared/interfaces';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class DataService {
  public searchSource = new BehaviorSubject(null);
  currentInput = this.searchSource.asObservable()
  constructor(private http: HttpClient) {}
  searchFunc(event: any) {
    this.searchSource.next(event.target.value);
  }
  getProfile(): Observable<any> {
   return  this.http.get<Users[]>(`http://localhost:3000/public/users/profile`)
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
