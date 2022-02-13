import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { Room } from '../../models';
import { SelectionEventService } from '../../services/selectionEvent.service';
@Component({
  selector: 'appbit-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss'],
})
export class ChatboxComponent implements OnInit {
  rooms: Room[] = [];
  constructor(
    private webSocketService: WebSocketService,
    private selectionEventService: SelectionEventService
  ) {}

  ngOnInit(): void {
    // this.webSocketService.emit('joinRoom', { userId: 123, room: 888 });
    this.webSocketService.listen('roomList').subscribe((rooms) => {
      this.rooms = rooms as Room[];
      console.log('rooms', rooms);
    });
  }
}
