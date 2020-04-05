import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
      constructor(private http: HttpClient) {}

      get token(): string {
        return ''
      }

      login(user): Observable<any> {
       return  this.http.post('', user)
         .pipe(
           tap(this.setToken)
         )
      }

      addUser(user: any): Observable<any> {
        return this.http.post<any>(
          'http://localhost:3000/auth/user/signUp',
          user
        );
      }

      logout() {

      }

      isAuthenticated(): boolean {
        return !!this.token
      }

      private setToken(response) {
      console.log(response)
      }
}

