import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Room } from '../../../models';
import { SelectionEventService } from '../../../services/selectionEvent.service';
import { WebSocketService } from '../../../services/web-socket.service';

@Component({
  selector: 'appbit-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() rooms: Room[] = [];
  endSubs$: Subject<number> = new Subject<number>();
  selectedRoom: Partial<Room> = {};
  constructor(
    private webSocketService: WebSocketService,
    private selectionEventService: SelectionEventService
  ) {}
  joinRoom(room: Room) {
    this.webSocketService.emit('joinRoom', { userId: 11, room: room.room });
  }

  selectUser(room: Room) {
    console.log('asarchevi', room);
    this.joinRoom(room);
    this.selectionEventService.changeSelectedUser(room);
  }

  private _lisetnSelection() {
    this.selectionEventService.selectedUser$
      .pipe(takeUntil(this.endSubs$))
      .subscribe((room: Room) => {
        this.selectedRoom = room;
      });
  }
  ngOnInit(): void {
    this._lisetnSelection();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
  }

  sendMes() {
    this.webSocketService.emit('chatMessage', 'mogesalmebi eee');
  }

  checkSelection(room: Room) {
    console.log(room.room == this.selectedRoom?.room);
    return room.room == this.selectedRoom?.room;
  }
}
