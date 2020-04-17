import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessagesService} from '../../services/messages.service';
import {ChatDataModel} from '../../models/chat.model';
import {MessageDataModel} from '../../models/message.model';
import {Subscription} from 'rxjs';
import { ChatsSocketService } from '../../services/chats-socket.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {

  constructor(
    private readonly messagesService: MessagesService,
    private readonly chatsWebSocket: ChatsSocketService) { }

    private chatsWebSocketSub: Subscription;
    private chatsWebSocketSub2: Subscription;

  public getChatSub: Subscription;
  chat: ChatDataModel[] = [];
  messages: MessageDataModel[] = [];
  user = localStorage.getItem('st-token');
  token =  JSON.parse(atob(this.user.split('.')[1]));
  myId = this.token.user.id;
  currentChatId: string;
  page = 0;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  ngOnInit() {
      this.getChatSub = this.messagesService.getUserChats()
      .subscribe((res) => {
        this.chat = res.data;
        console.log(res.data);
      });

      this.chatsWebSocketSub = this.chatsWebSocket.connect().subscribe();
      this.chatsWebSocketSub2 = this.chatsWebSocket.getRealTimeChat()
        .subscribe((data: any) => {
          this.messages.push(data);
        });
  }
  ngOnDestroy() {
    this.getChatSub.unsubscribe();
    this.chatsWebSocketSub.unsubscribe();
    this.chatsWebSocketSub2.unsubscribe();
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
        this.scrollToBottom();
        // @ts-ignore
        // this.messages.push(res.data);
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

  scrollToBottom(): void {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      console.log('shevida')
  }
}
