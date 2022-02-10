import { Component } from '@angular/core';
import { io } from 'socket.io-client';
@Component({
  selector: 'appbit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'support';
  socket = io('http://localhost:3000/api/v1/chat');

  listenTo() {
    this.socket.on('message', (s) => console.log(s));
  }

  ngOnInit(): void {
    this.listenTo();
  }
}
