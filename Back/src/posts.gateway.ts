import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, MessageBody,
   ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { FollowersService } from './modules/followers/followers.service';

@WebSocketGateway(3001, {namespace: '/posts'})
export class PostsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() wss: any;

  constructor(private readonly followersService: FollowersService) {}

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`cient connected: ${client.id}`);
    client.emit('joinRoom', {});
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`cient disconnected: ${client.id}`);
    console.log(this.wss.adapter.nsp.adapter.rooms);
  }

  private readonly logger: Logger =  new Logger('AppGateWay');

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

  // @SubscribeMessage('joinInRoom')
  // handleMessage(
  //   @MessageBody() message: { token: string }, 
  //   @ConnectedSocket() client: Socket
  // ): WsResponse<unknown> {
  //   this.wss.to(message.room).emit('msgToClient', message); // for room broadcast 
  //   this.wss.emit('msgToCLient', 'hello'); // response to all clients who sent event
  //   client.emit('msgToCLient', 'hello'); // response to only one client who sent event
  //   return {event: 'msgToCLient', data: 'hello'} // response to only one client who sent event
  // }
}
