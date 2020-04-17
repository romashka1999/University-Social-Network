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
<<<<<<< HEAD
    private readonly chatsWebSocket: ChatsSocketService) { }

=======
    private readonly chatsWebSocket: ChatsSocketService
  ) {}
    private chatsWebSocketSub2: Subscription;
    private messageTyping: Subscription;
>>>>>>> 2ab6315e2f7c83b2583f8c1a7217fcad2d6e1066

  public getChatSub: Subscription;
  chat: ChatDataModel[] = [];
  messages: MessageDataModel[] = [];
  user = localStorage.getItem('st-token');
  token = JSON.parse(atob(this.user.split('.')[1]));
  myId = this.token.user.id;
  currentChatId: string;
  page = 0;
  typing = '';
  timeout;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  ngOnInit() {
    this.getChatSub = this.messagesService.getUserChats()
      .subscribe((res) => {
        this.chat = res.data;
        console.log(res.data);
      });

<<<<<<< HEAD
    this.chatsWebSocket.connect();
    
    this.chatsWebSocket.getRealTimeChat((data: any) => {
      this.messages.push(data);
      this.scrollToBottom();
    });
  }
  ngOnDestroy() {

=======
      this.chatsWebSocket.connect();
      this.chatsWebSocketSub2 = this.chatsWebSocket.getRealTimeChat()
        .subscribe((data: any) => {
          this.messages.push(data);
          this.scrollToBottom();
        });
  }
  ngOnDestroy() {
    this.getChatSub.unsubscribe();
    this.chatsWebSocketSub2.unsubscribe();
>>>>>>> 2ab6315e2f7c83b2583f8c1a7217fcad2d6e1066
  }

  getChat(chatId: string, page?: number) {
    if (chatId !== this.currentChatId) {
<<<<<<< HEAD

=======
      try {
        this.messageTyping.unsubscribe();
      } catch (e) {
        console.log('unsubscribe undefined');
      }
>>>>>>> 2ab6315e2f7c83b2583f8c1a7217fcad2d6e1066
      this.currentChatId = chatId;
      this.page = page;

      this.messagesService.getChatMessages(this.currentChatId, page).subscribe((res) => {
          console.log(page);
          console.log(res.data);
          this.messages = res.data;
          this.messages.reverse();
      });

      this.chatsWebSocket.typingToClient((message: { chatId: string, userId: number }) => {
        if (this.myId !== message.userId) {
          this.typing = 'typing...';
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.typing = '';
          }, 2000);
        }
      });

    } else {
      console.log('igive chatshi dgexar');
    }
  }
  isTyping() {
    this.chatsWebSocket.typingToServer(this.currentChatId, this.myId);
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
<<<<<<< HEAD
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    console.log('shevida')
=======
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      console.log('shevida');
>>>>>>> 2ab6315e2f7c83b2583f8c1a7217fcad2d6e1066
  }
}
