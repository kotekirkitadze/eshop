import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class SelectionEventService {
  private selectedUser = new BehaviorSubject<any>(null);
  selectedUser$ = this.selectedUser.asObservable();

  changeSelectedUser(user: any) {
    this.selectedUser.next(user);
  }
}
