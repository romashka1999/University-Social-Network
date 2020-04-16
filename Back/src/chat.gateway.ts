import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, MessageBody,
   ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { FollowersService } from './modules/followers/followers.service';
import { ChatsService } from './modules/chats/chats.service';

@WebSocketGateway(3001, {namespace: '/chats'})
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() wss: any;

  constructor(private readonly chatsService: ChatsService) {}

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
    const chats = await this.chatsService.getUserChats(userId, {page: 0, pageSize: 100});
    const chatsArray = chats.map(chat => chat._id);
    chatsArray.forEach( chatId => {
      client.join(`${chatId}chats`);
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
