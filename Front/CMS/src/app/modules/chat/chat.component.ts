import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from './chat.service';
import { ChatSocketService } from './posts-socket.service';
import { ServerError } from 'src/app/shared/server-response.interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  page: number = 0;
  pageSIze: number = 10;
  fixedSizeData = Array(10000).fill(30);
  @ViewChild('scrollMe', {static: false}) private myScrollContainer: ElementRef;
  @ViewChild('newMessage', {static: false}) newMessage;

  messages = [];

  constructor(
    private readonly chatService: ChatService,
    private readonly chatSocketService: ChatSocketService,
    private readonly ngxSpinner: NgxSpinnerService) { }

  ngOnInit() {
    this.chatSocketService.connect();

    this.chatSocketService.messageSentToClient( (data) => {
      console.log('aqaaa es chemisa', data);
      this.messages.push(data);
      this.scrollToBottom();
    });

    this.chatService.getChatMessages(this.page, this.pageSIze).subscribe((res) => {
      console.log(res);
      this.messages.unshift(...res.data.reverse());
    });
  }

  onSendMessageToTheChat() {
    this.chatService.sendMessageToChat({content: this.newMessage.nativeElement.value}).subscribe( (res) => {
      console.log(res);
    }, (err: ServerError) => {
      console.log(err);
    });
  }

  onScrollDown() {
    console.log('onScrollDown');
  }

  onScrollUp() {
    this.ngxSpinner.show();
    this.page++;
    this.chatService.getChatMessages(this.page, this.pageSIze).subscribe((res) => {
      this.messages.unshift(...res.data.reverse());
    });
    console.log('onScrollUp');
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (e) 
    { }
  }

}
