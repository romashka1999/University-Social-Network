import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {StAuthResponse, UserLogin, Users} from '../shared/interfaces';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
      constructor(private http: HttpClient) {}
      // helper = new JwtHelperService();
      get token(): string {
        return localStorage.getItem('st-token')
      }

      login(user: UserLogin): Observable<any> {
       return  this.http.post<any>('http://localhost:3000/auth/user/signIn', user)
         .pipe(
           tap(this.setToken)
         )
      }

      addUser(user: Users): Observable<any> {
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

      private setToken(response: any) {
        console.log(response)
        localStorage.setItem('st-token', response.accessToken)
        // this.helper.getTokenExpirationDate(localStorage.getItem('st-token'))
      }
}

