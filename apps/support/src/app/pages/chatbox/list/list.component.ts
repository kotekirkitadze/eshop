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
    this.webSocketService.emit('joinRoom', { userId: 'kote', room: room.room });
  }
  ngOnInit(): void {}
}
