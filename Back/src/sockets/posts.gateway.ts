import { SubscribeMessage, WebSocketGateway, OnGatewayInit, MessageBody,
   ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { FollowersService } from '../modules/followers/followers.service';

@WebSocketGateway(3001, {namespace: '/posts'})
export class PostsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() wss: any;

  constructor(private readonly followersService: FollowersService) {}

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`PostsGateway cient connected: ${client.id}`);
    client.emit('joinRoom', {});
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`cient disconnected: ${client.id}`);
    console.log(this.wss.adapter.nsp.adapter.rooms);
  }

  private readonly logger: Logger =  new Logger('PostsGateWay');

  afterInit(server: Server) {
    this.logger.log("initialized");
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(@MessageBody() message: { id: number }, @ConnectedSocket() client: Socket) {
    const userId = message.id;
    const followees = await this.followersService.getFolloweesByUserId(userId, {page: null, pageSize: null});
    const followeesArray = followees.map(follow => follow.userId);
    client.join(`${userId}posts`);
    followeesArray.forEach( userId => {
      client.join(`${userId}posts`);
    });
  }

  // *************************** post ******************************
  public async postCreated(loggedUserId: number, createdPostForSocket) {
    this.wss.to(`${loggedUserId}posts`).emit('postCreated', createdPostForSocket);
  }

  public async postUpdated(loggedUserId: number, updatedPost) {
    this.wss.to(`${loggedUserId}posts`).emit('postUpdated', updatedPost);
  }

  public async postDeleted(loggedUserId: number, deletedPost) {
    this.wss.to(`${loggedUserId}posts`).emit('postDeleted', deletedPost);
  }

  // ************************** react ****************************
  public async postReacted(loggedUserId: number, data) {
    this.wss.to(`${loggedUserId}posts`).emit('postReacted', data);
  }

  public async postUnReacted(loggedUserId: number) {
    this.wss.to(`${loggedUserId}posts`).emit('postUnReacted', true);
  }

  // ************************** comment *******************************
  public async commentCreated(loggedUserId: number, createdComment) {
    this.wss.to(`${loggedUserId}posts`).emit('commentCreated', createdComment);
  }

  public async commentDeleted(loggedUserId: number) {
    this.wss.to(`${loggedUserId}posts`).emit('commentDeleted', true);
  }

  public async commentUpdated(loggedUserId: number, data) {
    this.wss.to(`${loggedUserId}posts`).emit('commentUpdated', data);
  }

  public async commentReacted(loggedUserId: number, data) {
    this.wss.to(`${loggedUserId}posts`).emit('commentReacted', data);
  }

  public async commentUnReacted(loggedUserId: number, data) {
    this.wss.to(`${loggedUserId}posts`).emit('commentUnReacted', data);
  }

  // ************************** reply *******************************
  public async replyCreated(loggedUserId: number, createdReply) {
    this.wss.to(`${loggedUserId}posts`).emit('replyCreated', createdReply);
  }

  public async replyUpdated(loggedUserId: number, data) {
    this.wss.to(`${loggedUserId}posts`).emit('replyUpdated', data);
  }

  public async replyDeleted(loggedUserId: number) {
    this.wss.to(`${loggedUserId}posts`).emit('replyDeleted', true);
  }

  public async replyReacted(loggedUserId: number, data) {
    this.wss.to(`${loggedUserId}posts`).emit('replyReacted', data);
  }

  public async replyUnReacted(loggedUserId: number, data) {
    this.wss.to(`${loggedUserId}posts`).emit('replyUnReacted', data);
  }
}
