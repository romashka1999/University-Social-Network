import { SubscribeMessage, WebSocketGateway, OnGatewayInit, MessageBody,
   ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { FollowersService } from '../modules/followers/followers.service';
import { ChatsService } from 'src/modules/chats/chats.service';

@WebSocketGateway(3001, {namespace: '/posts'})
export class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() wss: any;

  constructor(
    private readonly followersService: FollowersService,
    private readonly chatsService: ChatsService) {}

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`PostsGateway cient connected: ${client.id}`);
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

    const followees = await this.followersService.getFolloweesByUserId(userId, {page: null, pageSize: null});

    const followeesArray = followees.map(follow => follow.userId);

    client.join(`${userId}`);

    client.join(`${userId}posts`);
    followeesArray.forEach( userId => {
      client.join(`${userId}posts`);
    });

    const chats = await this.chatsService.getUserChats(userId, {page: 0, pageSize: 100});
    const chatsArray = chats.map(chat => chat._id);
    chatsArray.forEach( chatId => {
      client.join(`${chatId}chats`);
    });
  }
  // *************************** CHAT ********************************
  public async messageCreated(chatId: string, createdMessage) {
    this.wss.to(`${chatId}chats`).emit('messageCreated', createdMessage);
  }
  
  // *************************** FOLLOW ******************************
  public async makeFollow(loggedUserId: number, data) {
    this.wss.to(`${loggedUserId}`).emit('makeFollow', data);
  }

  // *************************** post ******************************
  public async postCreated(loggedUserId: number, createdPostForSocket) {
    this.wss.to(`${loggedUserId}posts`).emit('postCreated', createdPostForSocket);
  }

  public async postReacted(loggedUserId: number, data) {
    this.wss.to(`${loggedUserId}posts`).emit('postReacted', data);
  }

  // ************************** comment *******************************
  public async commentCreated(loggedUserId: number, createdComment) {
    this.wss.to(`${loggedUserId}posts`).emit('commentCreated', createdComment);
  }

  public async commentReacted(loggedUserId: number, data) {
    this.wss.to(`${loggedUserId}posts`).emit('commentReacted', data);
  }

  // ************************** reply *******************************
  public async replyCreated(loggedUserId: number, createdReply) {
    this.wss.to(`${loggedUserId}posts`).emit('replyCreated', createdReply);
  }

  public async replyReacted(loggedUserId: number, data) {
    this.wss.to(`${loggedUserId}posts`).emit('replyReacted', data);
  }

}
