import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public socket = io('http://localhost:3001/posts');
  constructor(private authService: AuthService) {}


  connect() {
    this.socket.on('connect', () => {
    });

    this.socket.on('joinRoom', () => {
      const token = this.authService.token;
      const userParsed = JSON.parse(atob(token.split('.')[1]));
      const id = userParsed.user.id;
      console.log(id)
      this.socket.emit('joinRoom', { id });
    });
  }
}
