import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MessageModel} from '../models/message.model';
import {ChatModel} from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(private http: HttpClient) {}

  getChatMessages(id: string): Observable<MessageModel> {
   return  this.http.get<MessageModel>(`http://localhost:3000/public/messages/chat/${id}?page=0&pageSize=20`);
  }
  getUserChats(): Observable<ChatModel> {
    return this.http.get<ChatModel>(`http://localhost:3000/public/chats?page=0&pageSize=10`);
  }
  sendMessage(id: string, content: string): Observable<MessageModel> {
    return this.http.post<MessageModel>(`http://localhost:3000/public/messages/chat/${id}`, {
      content
    });
  }

}
