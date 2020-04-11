import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket = io('http://localhost:3001/');
  constructor() {}

  connect() {
    this.socket.on('connect', () => {
      // console.log(this.socket.hasListeners('connect'));
    })
    this.socket.on('msgToClient', (data) => {
      console.log(data)
    })
    this.socket.emit('msgToClient', 'hello my friend', (data: any) => {
      console.log(data)
    })
    // this.socket.emit('msgToCLient', 'ragac' , (data: any) => {
    //   console.log(data)
    // })
    this.socket.send('message', (data) => {
      console.log('cda:', data)
    })
  }
}
