import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, MessageBody,
   ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(3000, {namespace: '/app'})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() wss: Server;

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`cient connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
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
