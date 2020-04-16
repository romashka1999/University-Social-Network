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
  page = 0;
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

  getChat(chatId: string, page?: number) {
    this.currentChatId = chatId;
    this.page = page;
    this.messagesService.getChatMessages(this.currentChatId, page)
      .subscribe((res) => {
        console.log(page)
        console.log(res.data);
        this.messages = res.data;
        this.messages.reverse();
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
  onScroll() {
    console.log('scrolled!!');
    this.page += 1;
    this.messagesService.getChatMessages(this.currentChatId, this.page)
      .subscribe((res) => {
        console.log(res)
        this.messages.unshift(...res.data.reverse());
      });
  }
}
