import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService,
  EventBusService,
  User,
  UsersService,
} from '@appbit/users';
import { LocalstorageService } from 'libs/users/src/lib/services/localstorage.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ngshop-profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.scss'],
})
export class ProfileNavComponent implements OnInit, OnDestroy {
  endSubs$: Subject<number> = new Subject<number>();
  isActive = false;
  currentUserId = '';
  isAuth = '';
  userName = '';
  userImage = '';
  constructor(
    private authService: AuthService,
    private localStorageService: LocalstorageService,
    private router: Router,
    private usersService: UsersService,
    private eventBusService: EventBusService
  ) {}

  ngOnInit(): void {
    this.usersService
      .observeCurrentUser()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((user: User | null) => {
        if (user?.id) {
          this.currentUserId = user.id;
        }
        if (user?.name) {
          this.userName = user.name;
        }
        if (user?.image) {
          this.userImage = user.image;
        }
      });

    this.eventBusService.on(
      'changePic',
      (image: any) => (this.userImage = image)
    );
  }

  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
  }

  toOrderHistory() {
    this.router.navigate([`/history/${this.currentUserId}`]);
  }

  logOut() {
    this.authService.logOut();
    this.isActive = !this.isActive;
  }

  toggleMenu(): void {
    this.isAuth = this.localStorageService.getToken();
    if (!this.isAuth) {
      this.router.navigate(['login']);
      return;
    }
    this.isActive = !this.isActive;
  }

  goProfile(): void {
    this.router.navigate([`profile/${this.currentUserId}`]);
  }
}
