import { createReducer, on } from '@ngrx/store';
import { UserDetailDto } from 'src/app/models/dtos/userDetailDto';
import { setUserDetail, deleteUserDetail } from './auth.actions';

export interface AuthState {
  userDetail?: UserDetailDto;
}

const initialAuthState: AuthState = {
  userDetail: undefined,
};

export const AuthReducer = createReducer(
  initialAuthState,
  on(setUserDetail, (state: AuthState, { userDetail }) => ({
    ...state,
    userDetail: userDetail,
  })),
  on(deleteUserDetail, (state: AuthState) => ({
    ...state,
    userDetail: undefined,
  }))
);
