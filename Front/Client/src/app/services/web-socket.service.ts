import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket = io('http://localhost:3001/posts');
  constructor(private authService: AuthService) {}

  connect() {
    this.socket.on('connect', () => {
    })

    this.socket.on('joinRoom', () => {
      const token = this.authService.token;
      this.socket.emit('joinRoom', { token });
    })

  }
}
