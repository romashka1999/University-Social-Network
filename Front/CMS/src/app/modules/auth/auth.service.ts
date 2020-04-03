import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private url = environment.url + '/auth/admin';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router) { }


  public login(signedInData: {email: string, password: string}): Observable<any> {
    return this.http.post(this.url + '/signIn', signedInData);
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  public setTokenToLocalstorage(token: string) {
    localStorage.setItem('token', token);
    this.router.navigate(['/dashboard']);
  }

  public isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }
}
