import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { ChatDataModel } from '../../models/chat.model';
import { MessageDataModel } from '../../models/message.model';
import { Subscription } from 'rxjs';
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


  private getUserChatsSub: Subscription;
  private getChatMessagesSub: Subscription;

  chat: ChatDataModel[] = [];
  messages: MessageDataModel[] = [];
  user = localStorage.getItem('st-token');
  token = JSON.parse(atob(this.user.split('.')[1]));
  myId = this.token.user.id;
  currentChatId: string;
  page = 0;
  typing: boolean = false;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngOnInit() {

    this.getUserChatsSub = this.messagesService.getUserChats().subscribe((res) => {
      this.chat = res.data;
    });

    this.chatsWebSocket.connect();

    this.chatsWebSocket.messageCreated((data: any) => {
      this.messages.push(data);
      this.scrollToBottom();
    });
  }

  ngOnDestroy() {
    try {
      this.getUserChatsSub.unsubscribe();
      this.getChatMessagesSub.unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }

  getChat(chatId: string, page?: number) {
    if (chatId === this.currentChatId) {
      return
    }
    this.currentChatId = chatId;
    this.page = page;

    this.getChatMessagesSub = this.messagesService.getChatMessages(this.currentChatId, page).subscribe((res) => {
      this.messages = res.data;
      this.messages.reverse();
    });

    this.chatsWebSocket.typingToClient((message: { chatId: string, userId: number }) => {
      if (this.myId === message.userId) {
        return
      }
      this.typing = true;
      this.scrollToBottom();
      setTimeout(() => {
        this.typing = false;
      }, 2000);
    });
  }

  isTyping() {
    this.chatsWebSocket.typingToServer(this.currentChatId, this.myId);
  }

  sendMessage(chatId: string, content: string) {
    this.messagesService.sendMessage(chatId, content).subscribe((res) => {
      this.scrollToBottom();
      // @ts-ignore
      // this.messages.push(res.data);
    });
  }

  onScroll() {
    this.page++;
    this.messagesService.getChatMessages(this.currentChatId, this.page).subscribe((res) => {
      this.messages.unshift(...res.data.reverse());
    });
  }

  scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }
}
