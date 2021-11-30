import { createFeature, createReducer, on } from '@ngrx/store';
import * as actions from './actions';
export interface OrderInfo {
  id: string;
  date: string;
  fulfilled: boolean;
}
export interface AccountInfo {
  employeeId: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}
export interface AccountState {
  personalInfo: AccountInfo | null;
  orders: OrderInfo[] | null;
}

const initialState: AccountState = {
  personalInfo: null,
  orders: null,
};

export const accountFeature = createFeature({
  name: 'accountFeature',
  reducer: createReducer(
    initialState,
    on(actions.accountInformationLoaded, (s, a) => a.payload),
  ),
});
