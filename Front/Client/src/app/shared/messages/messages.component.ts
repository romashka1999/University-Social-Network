import { Component, OnInit } from '@angular/core';
import {MessagesService} from '../../services/messages.service';
import {ChatDataModel} from '../../models/chat.model';
import {MessageDataModel} from '../../models/message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private messagesService: MessagesService) { }
  chat: ChatDataModel[] = [];
  messages: MessageDataModel[] = [];
  user = localStorage.getItem('st-token');
  token =  JSON.parse(atob(this.user.split('.')[1]));
  myId = this.token.user.id;
  currentChatId: string;
  ngOnInit() {
    this.messagesService.getUserChats()
      .subscribe((res) => {
        this.chat = res.data;
        console.log(res.data);
      });
  }

  getChat(chatId: string) {
    this.currentChatId = chatId;
    this.messagesService.getChatMessages(chatId)
      .subscribe((res) => {
        this.messages = res.data;
        this.messages.reverse();
        console.log(this.messages);
      });
  }
  sendMessage(chatId: string, content: string) {
    this.messagesService.sendMessage(chatId, content)
      .subscribe((res) => {
        console.log(res.data);
        // @ts-ignore
        this.messages.push(res.data);
        console.log(this.messages);
      });
  }
}
