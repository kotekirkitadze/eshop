import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const buildUserSession = createAction('[Users] Build User Session');

export const buildUserSessionSuccess = createAction(
  '[Users] Build Users Success',
  props<{ user: User }>()
);

export const buildUserSessionFailure = createAction(
  '[Users] Build Users Failure'
);
