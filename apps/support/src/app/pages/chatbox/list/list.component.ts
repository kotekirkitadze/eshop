import { Component, Input, OnInit } from '@angular/core';
import { Room } from '../../../models';
import { WebSocketService } from '../../../services/web-socket.service';

@Component({
  selector: 'appbit-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() rooms: Room[] = [];
  constructor(private webSocketService: WebSocketService) {}
  joinRoom(room: Room) {
    this.webSocketService.emit('joinRoom', { userId: 11, room: room.room });
  }
  ngOnInit(): void {
    this.webSocketService.listen('message').subscribe((d) => {
      console.log('aaa', d);
    });
  }
  sendMes() {
    this.webSocketService.emit('chatMessage', 'mogesalmebi eee');
  }
}
