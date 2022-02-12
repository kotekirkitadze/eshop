import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../model';
import { SocketService } from '../../services/socket.Service';
import { UserDetailService } from '../../services/user-detail.service';

@Component({
  selector: 'appbit-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  currentUser: User = {};
  message: string = '';
  endSubs$: Subject<number> = new Subject<number>();
  constructor(
    private route: ActivatedRoute,
    private userDetailService: UserDetailService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this._checkIdAndGetData();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
  }

  joinSupportRoom(user: User) {
    console.log(user);
    this.socketService.emit('joinRoom', {
      userId: user.id,
      room: user.id,
      name: user.name,
      email: user.email,
      userImage: user.image,
    });
  }

  sendMessage() {
    this.socketService.emit('chatMessage', this.message);
  }

  private _checkIdAndGetData() {
    this.route.params.pipe(takeUntil(this.endSubs$)).subscribe((params) => {
      if (params.id) {
        this.userDetailService
          .getUserById(params.id)
          .pipe(takeUntil(this.endSubs$))
          .subscribe((user: User) => this.joinSupportRoom(user));
      }
    });
  }
}
