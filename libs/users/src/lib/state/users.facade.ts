import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as UsersActions from './users.actions';

@Injectable()
export class UsersFacade {
  constructor(private readonly store: Store) {}

  buildUserSession() {
    this.store.dispatch(UsersActions.buildUserSession());
  }
}
