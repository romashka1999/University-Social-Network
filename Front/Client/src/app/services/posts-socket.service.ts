import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import {UserService} from './user.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostSocketService {
  public socket = io(`${environment.socketApi}/posts`);

  constructor(private userService: UserService) {}

  connect() {
     this.socket.on('joinRoom', () => {
       console.log(this.socket.connected);
       const id = this.userService.getCurrentUser().id;
       this.socket.emit('joinRoom', { id });
     });
  }

  postCreated() {
    return new Observable(subscriber => {
      this.socket.on('postCreated', (data) => {
        subscriber.next(data);
      });
    });
  }

  postUpdated(cb) {
    this.socket.on('postUpdated', cb);
  }

  postDeleted(cb) {
    this.socket.on('postDeleted', cb);
  }

  postReacted() {
    return new Observable(subscriber => {
      this.socket.on('postReacted', (cb) => {
        subscriber.next(cb);
      });
    });
  }

  postUnReacted() {
    return new Observable(subscriber => {
      this.socket.on('postUnReacted', (cb) => {
        subscriber.next(cb);
      });
    });
  }

  commentCreated() {
    return new Observable(subscriber => {
      this.socket.on('commentCreated', (cb) => {
        subscriber.next(cb);
        console.log(cb)
      });
    });
  }

  commentUpdated(cb) {
    this.socket.on('commentUpdated', cb);
  }

  commentDeleted() {
    return new Observable(subscriber => {
      this.socket.on('commentDeleted', (cb) => {
        subscriber.next(cb);
      })
    })
  }

  disconnect() {
    this.socket.disconnect();
  }
}
