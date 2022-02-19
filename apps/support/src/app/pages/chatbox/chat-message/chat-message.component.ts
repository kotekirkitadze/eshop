import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Room } from '../../../models';
import { SelectionEventService } from '../../../services/selectionEvent.service';
import { WebSocketService } from '../../../services/web-socket.service';
import { Message } from '../../../models/model';
import { SocketEvents } from '../../../models/socket-events';

@Component({
  selector: 'appbit-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit, OnDestroy {
  isWriting = false;
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
    this.listenWriting();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
  }

  startWriting() {
    console.log('started');
  }

  stopWriting() {
    console.log('stopped writing');
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
      .listen(SocketEvents.message)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((message: any) => this.generateMessage(message, false));
  }

  private _listenBotMessage() {
    this.webSocketService
      .listen(SocketEvents.botMessage)
      .subscribe((payload: any) => {
        if (payload.roomId == this.room?.userId) {
          this.generateMessage(payload.text, false, true);
        }
      });
  }

  generateMessage(message: any, isSelf: boolean, isBot: boolean = false): void {
    const newMessage: Message = {
      isBot,
      isSelf: isSelf,
      name: isSelf ? this.room?.name : message.username,
      message: isSelf ? this.message : message.text,
      time: isSelf ? '' + new Date() : message.time,
    };
    console.log(newMessage);
    this.messages.push(newMessage);
  }

  sendMessage(): void {
    this.webSocketService.emit(SocketEvents.chatMessage, this.message);
    this.generateMessage('_', true);
    this.message = '';
  }

  completeRoom() {
    this.webSocketService.emit(
      SocketEvents.userCompleteChat,
      this.room?.userId
    );
    this.selectionEventService.changeSelectedUser(null);
    this._resetValues();
  }

  private _resetValues(): void {
    this.messages = [];
    this.room = undefined;
  }
  listenWriting() {
    this.webSocketService
      .listen(SocketEvents.startWriting)
      .subscribe((writingData: any) => {
        if (writingData.roomId == this.room?.userId)
          this.isWriting = writingData.controller;
      });
  }
}

//  listenWriting() {
//     this.webSocketService
//       .listen('startWriting')
//       .subscribe((writingData: any) => {
//         if (writingData.roomId == this.room?.userId)
//           this.isWriting = writingData.controller as boolean;
//       });
//   }
