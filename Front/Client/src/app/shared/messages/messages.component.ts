import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessagesService} from '../../services/messages.service';
import {ChatDataModel} from '../../models/chat.model';
import {MessageDataModel} from '../../models/message.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {

  constructor(private messagesService: MessagesService) { }
  public getChatSub: Subscription;
  chat: ChatDataModel[] = [];
  messages: MessageDataModel[] = [];
  user = localStorage.getItem('st-token');
  token =  JSON.parse(atob(this.user.split('.')[1]));
  myId = this.token.user.id;
  currentChatId: string;
  ngOnInit() {
      this.getChatSub = this.messagesService.getUserChats()
      .subscribe((res) => {
        this.chat = res.data;
        console.log(res.data);
      });
  }
  ngOnDestroy() {
    this.getChatSub.unsubscribe();
  }

  getChat(chatId: string) {
    this.currentChatId = chatId;
    this.messagesService.getChatMessages(chatId)
      .subscribe((res) => {
        console.log(res.data);
        this.messages = res.data;
      });
  }
  sendMessage(chatId: string, content: string) {
    this.messagesService.sendMessage(chatId, content)
      .subscribe((res) => {
        console.log(res.data);
        // გაასწორე თუ მაგარი კაციხარ ცხვარმენ
        // @ts-ignore
        this.messages.push(res.data);
        console.log(this.messages);
      });
  }
}
