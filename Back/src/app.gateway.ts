import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, MessageBody,
   ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { FollowersService } from './modules/followers/followers.service';

@WebSocketGateway(3001, {namespace: '/posts'})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() wss: Server;

  constructor(private readonly followersService: FollowersService) {}

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`cient connected: ${client.id}`);
    client.emit('joinRoom', {});
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`cient disconnected: ${client.id}`);
    // const userId = 1;
    // const followees = await this.followersService.getFolloweesByUserId(userId, {page: null, pageSize: null});
    // const followeesArray = followees.map(follow => follow.userId);
    // client.leave(`${userId}`);
    // followeesArray.forEach( userId => {
    //   client.leave(`${userId}`);
    // });
  }

  private readonly logger: Logger =  new Logger('AppGateWay');

  afterInit(server: Server) {
    this.logger.log("initialized");
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


  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() message: { token: string }, @ConnectedSocket() client: Socket) {
    console.log(client.id);
    console.log(message);
    // console.log(client);
    // const userId = 1; 
    // const followees = await this.followersService.getFolloweesByUserId(userId, {page: null, pageSize: null});
    // const followeesArray = followees.map(follow => follow.userId);
    // client.join(`${userId}`);
    // followeesArray.forEach( userId => {
    //   client.join(`${userId}`);
    // });
  }
}
