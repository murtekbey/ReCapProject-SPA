import { createReducer, on } from '@ngrx/store';
import { setUserDetail, deleteUserDetail } from './auth.actions';
import { UserDetailDto } from '../../models/dtos/userDetailDto';

export interface AuthState {
  userDetailDto?: UserDetailDto;
}

const initialAuthState: AuthState = {
  userDetailDto: undefined,
};

export const AuthReducer = createReducer(
  initialAuthState,
  on(setUserDetail, (state: AuthState, { userDetailDto }) => ({
    ...state,
    userDetailDto: userDetailDto,
  })),
  on(deleteUserDetail, (state: AuthState) => ({
    ...state,
    userDetailDto: undefined,
  }))
);
