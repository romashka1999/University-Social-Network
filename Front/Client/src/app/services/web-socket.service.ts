import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public socket = io(`${environment.socketApi}/posts`);
  constructor() {}

  connect() {
   return new Observable(() => {
     this.socket.on('joinRoom', () => {
       console.log(this.socket.connected);
       const user = localStorage.getItem('st-token');
       const token =  JSON.parse(atob(user.split('.')[1]));
       const id = token.user.id;
       this.socket.emit('joinRoom', { id });
     });
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
