import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
@Component({
  selector: 'ngshop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ngshop';
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

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
  ngOnInit(): void {
    this.emit('joinRoom', { userId: 12, room: 'support' });
    this.listen('message').subscribe(console.log);
  }

  sendM() {
    this.emit('chatMessage', 'mogesalmebi saforto');
  }
}
