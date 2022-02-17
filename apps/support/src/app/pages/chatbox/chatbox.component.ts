import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { Room } from '../../models';
import { User } from '@appbit/users';
import { SocketEvents } from '../../models/socket-events';
@Component({
  selector: 'appbit-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss'],
})
export class ChatboxComponent implements OnInit {
  rooms: Room[] = [];
  user: User = {};
  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this._listenRooms();
  }

  private _listenRooms() {
    this.webSocketService.listen(SocketEvents.roomList).subscribe((rooms) => {
      this.rooms = rooms as Room[];
    });
  }
}
