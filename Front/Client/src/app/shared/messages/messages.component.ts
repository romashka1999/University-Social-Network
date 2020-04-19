import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
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


  chatId: string;
  chat: ChatDataModel[] = [];
  messages: MessageDataModel[] = [];
  user = localStorage.getItem('st-token');
  token = JSON.parse(atob(this.user.split('.')[1]));
  myId = this.token.user.id;
  currentChatId: string;
  page = 0;
  typing = false;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  ngOnInit() {

    window.onbeforeunload = () => {
      this.chatsWebSocket.stopTypingToServer(this.currentChatId, this.myId);
    };

    this.getUserChatsSub = this.messagesService.getUserChats()
      .subscribe((res) => {
      this.chat = res.data;
    });

    this.chatsWebSocket.connect();

    this.chatsWebSocket.messageCreated((data: any) => {
      this.typing = false;
      this.messages.push(data);
      this.scrollToBottom();
    });

    this.chatsWebSocket.typingToClient((message: { chatId: string, userId: number }) => {
      if (this.myId === message.userId || this.chatId !== message.chatId) {
        return
      }
      this.typing = true;
    });

    this.chatsWebSocket.stopTypingToClient((message: { chatId: string, userId: number }) => {
      if (this.myId === message.userId || this.chatId !== message.chatId) {
        return
      }
      this.typing = false;
    });
  }

  ngOnDestroy() {
       this.getUserChatsSub.unsubscribe();
  }

  getChat(chatId: string, page?: number) {
    this.chatId = chatId;
    this.typing = false;
    if (chatId === this.currentChatId) {
      return
    }
    this.chatsWebSocket.stopTypingToServer(this.currentChatId, this.myId);
    this.currentChatId = chatId;
    this.page = page;

    this.messagesService.getChatMessages(this.currentChatId, page)
      .subscribe((res) => {
      this.typing = false;
      this.messages = res.data;
      this.messages.reverse();
      setTimeout(() => {
        this.myScrollContainer.nativeElement.scrollTo(0, this.myScrollContainer.nativeElement.scrollHeight);
      }, 0);
    });
  }

  isTyping(newMassage) {
    const isTyping = newMassage.value.length > 0 ? true : false;

    if (isTyping) {
      this.chatsWebSocket.typingToServer(this.currentChatId, this.myId);
    } else {
      this.chatsWebSocket.stopTypingToServer(this.currentChatId, this.myId);
    }
  }

  sendMessage(chatId: string, content: string) {
    this.messagesService.sendMessage(chatId, content).subscribe(() => {
      this.typing = false;
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
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (e) { }
  }
}
