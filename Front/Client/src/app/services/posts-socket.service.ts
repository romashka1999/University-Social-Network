import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
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

  postCreated(cb) {
      this.socket.on('postCreated', cb);
  }

  postUpdated(cb) {
    this.socket.on('postUpdated', cb);
  }

  postDeleted(cb) {
    this.socket.on('postDeleted', cb);
  }

  postReacetd(cb) {
    this.socket.on('postReacted', cb);
  }

  postUnReacted(cb) {
    this.socket.on('postUnReacted', cb);
  }

  commentCreated(cb) {
    this.socket.on('commentCreated', cb);
  }

  commentUpdated(cb) {
    this.socket.on('commentUpdated', cb);
  }

  commentDeleted(cb) {
    this.socket.on('commentDeleted', cb);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
