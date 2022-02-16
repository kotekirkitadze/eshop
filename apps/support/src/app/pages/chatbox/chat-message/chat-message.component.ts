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

  ngOnInit(): void {
    this._listenSelectedRoom();
    this._listenMessage();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
  }

  private _listenSelectedRoom() {
    this.selectionEventService.selectedUser$
      .pipe(takeUntil(this.endSubs$))
      .subscribe((room: Room) => {
        this.room = room;
      });
  }

  private _listenMessage() {
    this.webSocketService
      .listen('message')
      .pipe(takeUntil(this.endSubs$))
      .subscribe((message: any) => this.generateMessage(message, false));
  }

  generateMessage(message: any, isSelf: boolean): void {
    const newMessage: Message = {
      isSelf: isSelf,
      name: isSelf ? this.room?.name : message.username,
      message: isSelf ? this.message : message.text,
      time: isSelf ? '' + new Date().getDay() : message.time,
    };
    this.messages.push(newMessage);
  }

  sendMessage(): void {
    this.webSocketService.emit('chatMessage', this.message);
    this.generateMessage('_', true);
    this.message = '';
  }

  completeRoom() {
    this.webSocketService.emit('userCompleteChat', this.room?.userId);
    this.selectionEventService.changeSelectedUser(null);
    this._resetValues();
  }

  private _resetValues(): void {
    this.messages = [];
    this.room = undefined;
  }
}
