import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { GetUserData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatsSocketService {
  public socket = io(`${environment.socketApi}/chats`);
  public userProfile: GetUserData = localStorage.getItem('st-token') ? JSON.parse(atob(localStorage.getItem('st-token').split('.')[1])).user : null
  constructor() {
  }

  connect() {
    this.socket.on('joinRoom', () => {
      console.log(this.socket.connected);
      const id = this.userProfile?.id;
      this.socket.emit('joinRoom', { id });
    });
  }

  messageCreated(cb) {
    this.socket.on('messageCreated', cb);
  }

  typingToServer(chatId: string, userId: number) {
    this.socket.emit('typingToServer', { chatId, userId });
  }

  typingToClient(cb) {
    this.socket.on('typingToClient', cb)
  }

  stopTypingToServer(chatId: string, userId: number) {
    this.socket.emit('stopTypingToServer', { chatId, userId });
  }

  stopTypingToClient(cb) {
    this.socket.on('stopTypingToClient', cb)
  }

  disconnect() {
    this.socket.disconnect();
  }
}
