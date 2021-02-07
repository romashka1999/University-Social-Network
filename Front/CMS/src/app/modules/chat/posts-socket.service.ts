import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChatSocketService {
  public socket = io(`${environment.socketUrl}/adminChat`);

  connect() {
    this.socket.on('connect', () => {
      console.log('chat socket connected');
    });
  }

  messageSentToClient(cb) {
      this.socket.on('messageSentToClient', cb);
  }

}
