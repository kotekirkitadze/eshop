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
  room: Partial<Room> | undefined = {};
  message = '';
  messages: Message[] = [];
  endSubs$: Subject<number> = new Subject<number>();

  constructor(
    private webSocketService: WebSocketService,
    private selectionEventService: SelectionEventService
  ) {}

  private _listenMessage() {
    this.webSocketService
      .listen('message')
      .pipe(takeUntil(this.endSubs$))
      .subscribe((message: any) => {
        this.messages.push({
          name: message.username,
          isSelf: false,
          time: message.time,
          message: message.text,
        });
      });
  }

  ngOnInit(): void {
    this._listenMessage();
    this._listenSelectedRoom();
  }

  private _listenSelectedRoom() {
    this.selectionEventService.selectedUser$
      .pipe(takeUntil(this.endSubs$))
      .subscribe((room: Room) => {
        this.room = room;
        console.log('new selcetion', room);
      });
  }

  completeRoom() {
    // this.webSocketService.dd();
    this.messages = [];
    this.webSocketService.emit('userCompleteChat', this.room?.userId);
    this.selectionEventService.changeSelectedUser(null);
    this.room = undefined;
  }

  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
  }

  sendMessage(): void {
    this.webSocketService.emit('chatMessage', this.message);
    const message: Message = {
      isSelf: true,
      name: this.room?.name ? this.room.name : '',
      message: this.message,
      time: '' + new Date().getDay(),
      // image: this.room.image ? this.currentUser.image : '',
    };
    this.messages.push(message);
    this.message = '';
  }
}
