import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { Room } from '../../models';
import { SelectionEventService } from '../../services/selectionEvent.service';
import { User, UsersService } from '@appbit/users';
@Component({
  selector: 'appbit-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss'],
})
export class ChatboxComponent implements OnInit {
  rooms: Room[] = [];
  user: User = {};
  constructor(
    private webSocketService: WebSocketService,
    private selectionEventService: SelectionEventService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this._listenRooms();
    this._resetRooms();
  }

  private _listenRooms() {
    this.webSocketService.listen('roomList').subscribe((rooms) => {
      this.rooms = rooms as Room[];
      console.log('roomseee', rooms);
    });
  }
  private _resetRooms() {
    this.webSocketService.listen('resetRooms').subscribe((rooms) => {
      this.rooms = rooms as Room[];
      console.log('roomseee', rooms);
    });
  }
}
