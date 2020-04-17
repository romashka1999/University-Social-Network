import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {UserLogin, Users} from '../shared/interfaces';
import {Router} from '@angular/router';
import {PostSocketService} from './posts-socket.service';
import {environment} from '../../environments/environment';
import {ChatsSocketService} from './chats-socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient,
              private router: Router,
              private webSocket: PostSocketService,
              private chatsWebSocket: ChatsSocketService
  ) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('st-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('st-token');
  }

  login(user: UserLogin): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/user/signIn`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  addUser(user: Users): Observable<any> {
    return this.http.post<any>(
      `${environment.api}/auth/user/signUp`,
      user
    );
  }

  logout() {
    this.setToken(null);
    this.webSocket.disconnect();
    this.chatsWebSocket.disconnect();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error;
    switch (message) {
      case 'INVALID_CREDENTIALS':
        this.error$.next('INVALID_CREDENTIALS');
        break;
    }
    return throwError(error);
  }

  private setToken(response: any | null) {
    if (response) {
      localStorage.setItem('st-token', response.accessToken);
      const token = JSON.parse(atob(response.accessToken.split('.')[1]));
      const expDate = new Date(new Date().getTime() + token.exp / 100);
      localStorage.setItem('st-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}

