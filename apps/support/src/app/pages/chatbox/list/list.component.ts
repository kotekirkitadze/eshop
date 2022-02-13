import { Component, Input, OnInit } from '@angular/core';
import { Room } from '../../../models';
import { SelectionEventService } from '../../../services/selectionEvent.service';
import { WebSocketService } from '../../../services/web-socket.service';

@Component({
  selector: 'appbit-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() rooms: Room[] = [];
  constructor(
    private webSocketService: WebSocketService,
    private selectionEventService: SelectionEventService
  ) {}
  joinRoom(room: Room) {
    this.webSocketService.emit('joinRoom', { userId: 11, room: room.room });
  }

  selectUser(room: Room) {
    this.joinRoom(room);
    this.selectionEventService.changeSelectedUser(room);
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
