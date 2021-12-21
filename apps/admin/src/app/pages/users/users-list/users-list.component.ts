import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, User } from '@appbit/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as countriesLib from 'i18n-iso-countries';
import { Subject, takeUntil } from 'rxjs';

declare const require;

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  endSubs$: Subject<number> = new Subject<number>();
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this._getUsers();

    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
  }

  getCountryName(countryCode: string) {
    if (countryCode) {
      return countriesLib.getName(countryCode, 'en', { select: 'official' });
    } else {
      return '';
    }
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this user?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService
          .deletUser(userId)
          .pipe(takeUntil(this.endSubs$))
          .subscribe(
            (user: User) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `User ${user.name} is deleted`,
              });
              this._getUsers();
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'User is not deleted',
              });
            }
          );
      },
    });
  }
  updateUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`);
  }

  private _getUsers() {
    this.usersService
      .getUsers()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((users: User[]) => (this.users = users));
  }
}
