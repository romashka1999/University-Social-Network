import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatsWebSocket {
  public socket = io('http://localhost:3001/chats');
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
  getRealTimeChat() {
    return new Observable((subscriber) => {
      this.socket.on('messageCreated', (data) => {
        subscriber.next(data);
      });
    });
  }
  disconnect() {
    this.socket.disconnect();
  }
}
