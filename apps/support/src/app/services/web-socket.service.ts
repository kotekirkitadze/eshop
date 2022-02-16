import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
@Injectable({ providedIn: 'root' })
export class WebSocketService {
  socket: any;
  readonly url: string = 'http://localhost:3000/api/v1/chat';

  constructor() {
    this.socket = io(this.url);
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  listenSpecificRoom(eventName: string, room: string) {
    return new Observable((subscriber) => {
      this.socket.to(room).on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any = '') {
    this.socket.emit(eventName, data);
  }
}

// socket.on('unsubscribe', function (room) {
//   try {
//     console.log('[socket]', 'leave room :', room);
//     socket.leave(room);
//     socket.to(room).emit('user left', socket.id);
//   } catch (e) {
//     console.log('[error]', 'leave room :', e);
//     socket.emit('error', 'couldnt perform requested action');
//   }
// });
