import { createReducer, on } from '@ngrx/store';
import { logOut } from '../actions/auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
  userName: string;
}

const initialState: AuthState = {
  isLoggedIn: true,
  userName: 'Bob',
};

export const reducer = createReducer(
  initialState,
  on(logOut, (s) => ({ ...s, isLoggedIn: false })),
);
