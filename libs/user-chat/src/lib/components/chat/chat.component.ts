import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Message, User } from '../../model';
import { SocketService } from '../../services/socket.Service';
import { UserDetailService } from '../../services/user-detail.service';

@Component({
  selector: 'appbit-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  currentUser: User = {};
  message = '';
  messages: Message[] = [];
  endSubs$: Subject<number> = new Subject<number>();
  controller = false;
  constructor(
    private route: ActivatedRoute,
    private userDetailService: UserDetailService,
    private socketService: SocketService
  ) {}

  listenMessage() {
    this.socketService.listen('message').subscribe((message: any) => {
      this.messages.push({
        name: message.username,
        isSelf: false,
        time: message.time,
        message: message.text,
        image: message.image,
      });
    });
  }

  ngOnInit(): void {
    this.listenMessage();
    this._checkIdAndGetData();
    this._listenSupportCompleteChatEvent();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
    this.socketService.disconnect();
  }

  joinSupportRoom(user: User) {
    this.socketService.emit('joinRoom', {
      userId: user.id,
      room: user.id,
      name: user.name,
      email: user.email,
      userImage: user.image,
    });
  }

  private _listenSupportCompleteChatEvent() {
    this.socketService.listen('userCompleteChat').subscribe((room: any) => {
      if (this.currentUser) {
        if (this.currentUser.id == room) {
          this.socketService.disconnect();
        }
      }
    });
  }

  sendMessage() {
    this.socketService.emit('chatMessage', this.message);
    const message: Message = {
      isSelf: true,
      name: this.currentUser.name ? this.currentUser.name : '',
      message: this.message,
      time: '' + new Date().getDay(),
      image: this.currentUser.image ? this.currentUser.image : '',
    };
    this.messages.push(message);
    this.message = '';
  }

  private _checkIdAndGetData() {
    this.route.params.pipe(takeUntil(this.endSubs$)).subscribe((params) => {
      if (params.id) {
        this.userDetailService
          .getUserById(params.id)
          .pipe(takeUntil(this.endSubs$))
          .subscribe((user: User) => {
            this.currentUser = user;
            this.joinSupportRoom(user);
          });
      }
    });
  }

  isWriting(controller: boolean) {
    this.socketService.emit('startWriting', controller);
  }
}
