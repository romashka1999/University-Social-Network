import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {GetUserData} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatsSocketService {
  public socket = io(`${environment.socketApi}/chats`);
  public userProfile: GetUserData = JSON.parse(atob(localStorage.getItem('st-token').split('.')[1])).user;
  constructor() {
  }

  connect() {
      this.socket.on('joinRoom', () => {
        console.log(this.socket.connected);
        const id = this.userProfile.id;
        this.socket.emit('joinRoom', {id});
      });
  }

  getRealTimeChat() {
    return new Observable((subscriber) => {
      this.socket.on('messageCreated', (data) => {
        subscriber.next(data);
      });
    });
  }

  typingToServer(chatId: string, userId: number) {
      this.socket.emit('typingToServer', { chatId, userId });
  }

  typingToClient() {
    return new Observable((subscriber) => {
      this.socket.on('typingToClient', (message: { chatId: string, userId: number }) => {
        subscriber.next(message);
      });
    });
  }

  disconnect() {
    this.socket.disconnect();
  }
}
