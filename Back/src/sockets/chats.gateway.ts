import { SubscribeMessage, WebSocketGateway, OnGatewayInit, MessageBody,
   ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ChatsService } from '../modules/chats/chats.service';

@WebSocketGateway(3001, {namespace: '/chats'})
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() wss: any;

  constructor(private readonly chatsService: ChatsService) {}

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`ChatsGateway cient connected: ${client.id}`);
    client.emit('joinRoom', {});
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`cient disconnected: ${client.id}`);
    console.log(this.wss.adapter.nsp.adapter.rooms);
  }

  private readonly logger: Logger =  new Logger('ChatsGateWay');

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

  @SubscribeMessage('typingToServer')
  async handleMessage(@MessageBody() message: { chatId: string, userId: number }, @ConnectedSocket() client: Socket): Promise<void> {
    if(client.in(`${message.chatId}chats`)) {
      this.wss.to(`${message.chatId}chats`).emit('typingToClient', message);
    }
  }

  public async messageCreated(chatId: string, createdMessage) {
    this.wss.to(`${chatId}chats`).emit('messageCreated', createdMessage);
  }


}
