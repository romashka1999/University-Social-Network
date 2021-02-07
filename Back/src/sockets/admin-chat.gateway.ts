import { SubscribeMessage, WebSocketGateway, OnGatewayInit, MessageBody,
   ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ChatsService } from '../modules/chats/chats.service';

@WebSocketGateway(3001, {namespace: '/adminChat'})
export class AdminChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() wss: any;

  constructor() {}

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`ChatsGateway cient connected: ${client.id}`);
    client.emit('joinRoom', {});
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`cient disconnected: ${client.id}`);
    console.log(this.wss.adapter.nsp.adapter.rooms);
  }

  private readonly logger: Logger =  new Logger('AdminChatGateway');

  afterInit(server: Server) {
    this.logger.log("initialized");
  }

  public async messageSentToClient(createdMessage: any) {
    this.wss.emit('messageSentToClient', createdMessage);
  }

}
