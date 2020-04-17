import { SubscribeMessage, WebSocketGateway, OnGatewayInit, MessageBody,
   ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ChatsService } from '../modules/chats/chats.service';
import { FollowersService } from 'src/modules/followers/followers.service';

@WebSocketGateway(3001, {namespace: '/notifications'})
export class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() wss: any;

  constructor(
    private readonly chatsService: ChatsService,
    private readonly followersService: FollowersService) {}

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`ChatsGateway cient connected: ${client.id}`);
    client.emit('joinRoom', {});
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`cient disconnected: ${client.id}`);
    console.log(this.wss.adapter.nsp.adapter.rooms);
  }

  private readonly logger: Logger =  new Logger('NotificationsGateway');

  afterInit(server: Server) {
    this.logger.log("initialized");
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(@MessageBody() message: { id: number }, @ConnectedSocket() client: Socket) {
    const userId = message.id;

    const chats = await this.chatsService.getUserChats(userId, {page: 0, pageSize: 100});
    const chatsArray = chats.map(chat => chat._id);
    chatsArray.forEach( chatId => {
      client.join(`${chatId}chats`);
    });

    const followees = await this.followersService.getFolloweesByUserId(userId, {page: null, pageSize: null});
    const followeesArray = followees.map(follow => follow.userId);
    client.join(`${userId}posts`);
    followeesArray.forEach( userId => {
      client.join(`${userId}posts`);
    });
  }

}
