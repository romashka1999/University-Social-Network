import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MessageModel} from '../models/message.model';
import {ChatModel} from '../models/chat.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(private http: HttpClient) {}

  getChatMessages(id: string, page?: number): Observable<MessageModel> {
    return  this.http.get<MessageModel>(`${environment.api}/public/messages/chat/${id}?page=${page}&pageSize=10`);
  }
  getUserChats(): Observable<ChatModel> {
    return this.http.get<ChatModel>(`${environment.api}/public/chats?page=0&pageSize=10`);
  }
  sendMessage(id: string, content: string): Observable<MessageModel> {
    return this.http.post<MessageModel>(`${environment.api}/public/messages/chat/${id}`, {
      content
    });
  }

}
