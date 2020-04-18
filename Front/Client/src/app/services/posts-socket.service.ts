import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostSocketService {
  public socket = io(`${environment.socketApi}/posts`);
  constructor(private userService: UserService) {}

  connect() {
     this.socket.on('joinRoom', () => {
       console.log(this.socket.connected);
       const user = this.userService.getCurrentUser();
       const id = user.id;
       this.socket.emit('joinRoom', { id });
     });
  }
  getRealTimePost() {
    return new Observable((subscriber) => {
      this.socket.on('postCreated', (data) => {
        subscriber.next(data);
      });
    });
  }
  disconnect() {
    this.socket.disconnect();
  }
}
