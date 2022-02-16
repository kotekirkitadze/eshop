import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService, User, UsersService } from '@appbit/users';
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
  currentUser: User = {};
  endSubs$: Subject<number> = new Subject<number>();
  selectedRoom: Partial<Room> = {};

  constructor(
    private webSocketService: WebSocketService,
    private selectionEventService: SelectionEventService,
    private authService: AuthService,
    private userService: UsersService
  ) {}

  joinRoom(room: Room) {
    const infoForSupport: Room = {
      email: this.currentUser.email ? this.currentUser?.email : '',
      userId: this.currentUser.id ? this.currentUser.id : '',
      name: this.currentUser.name ? this.currentUser.name : '',
      userImage: this.currentUser.image ? this.currentUser.image : '',
      room: room.room,
    };

    this.webSocketService.emit('joinRoom', infoForSupport);
  }

  selectUser(room: Room) {
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

  private _listenUserChange() {
    this.userService.observeCurrentUser().subscribe((user: any) => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    this._listenUserChange();

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
    return room.room == this.selectedRoom?.room;
  }

  logOut() {
    this.authService.logout();
  }
}
