import { Injectable } from '@angular/core';
import { UserDetailDto } from '../models/dtos/userDetailDto';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  token: string = 'user';
  user: string = 'user';

  constructor() {}

  setToken(responseToken: string) {
    localStorage.setItem(this.token, responseToken);
  }

  removeToken() {
    localStorage.removeItem(this.token);
  }

  getToken() {
    return localStorage.getItem(this.token);
  }

  isAuthenticated() {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  setUser(userDetailsDto: UserDetailDto) {
    localStorage.setItem(this.user, JSON.stringify(userDetailsDto));
  }

  getUser(): UserDetailDto {
    return JSON.parse(localStorage.getItem(this.user));
  }

  removeUser() {
    localStorage.removeItem(this.user);
  }
}
