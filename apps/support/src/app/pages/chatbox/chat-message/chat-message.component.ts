import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Room } from '../../../models';
import { SelectionEventService } from '../../../services/selectionEvent.service';
import { WebSocketService } from '../../../services/web-socket.service';
import { Message } from '../../../models/model';
@Component({
  selector: 'appbit-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit, OnDestroy {
  room: Partial<Room> = {};
  message = '';
  messages: Message[] = [];
  endSubs$: Subject<number> = new Subject<number>();

  constructor(
    private webSocketService: WebSocketService,
    private selectionEventService: SelectionEventService
  ) {}

  ngOnInit(): void {
    this.selectionEventService.selectedUser$
      .pipe(takeUntil(this.endSubs$))
      .subscribe((room: Room) => {
        this.room = room;
      });
  }

  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
  }

  sendMessage(): void {}
}
