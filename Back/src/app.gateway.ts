import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, MessageBody,
   ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { FollowersService } from './modules/followers/followers.service';

@WebSocketGateway(3001, {namespace: '/app'})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() wss: Server;

  constructor(private readonly followersService: FollowersService) {}

  async handleConnection(client: Socket, ...args: any[]) {
    const userId = 1; 
    const followees = await this.followersService.getFolloweesByUserId(userId, {page: null, pageSize: null});
    const followeesArray = followees.map(follow => follow.userId);
    client.join(`${userId}`);
    followeesArray.forEach( userId => {
      client.join(`${userId}`);
    });
    this.logger.log(`cient connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    const userId = 1;
    const followees = await this.followersService.getFolloweesByUserId(userId, {page: null, pageSize: null});
    const followeesArray = followees.map(follow => follow.userId);
    client.leave(`${userId}`);
    followeesArray.forEach( userId => {
      client.leave(`${userId}`);
    });
    this.logger.log(`cient disconnected: ${client.id}`);
  }

  private readonly logger: Logger =  new Logger('AppGateWay');

  afterInit(server: Server) {
    this.logger.log("initialized");
  }

  @SubscribeMessage('msgToServer')
  handleMessage(
    @MessageBody() message: { rame: string, datasSXvanawili: 'aasd', room: 'rame'}, 
    @ConnectedSocket() client: Socket
  ): WsResponse<unknown> {
    this.wss.to(message.room).emit('msgToClient', message); // for room broadcast 
    this.wss.emit('msgToCLient', 'hello'); // response to all clients who sent event
    client.emit('msgToCLient', 'hello'); // response to only one client who sent event
    return {event: 'msgToCLient', data: 'hello'} // response to only one client who sent event
  }


  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('elaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }
}
