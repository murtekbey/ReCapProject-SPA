import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserForLoginDto } from '../models/dtos/userForLoginDto';
import { UserForRegisterDto } from '../models/dtos/userForRegisterDto';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { UserDetailDto } from '../models/dtos/userDetailDto';
import { AppState } from '../store/app.reducer';
import { deleteUserDetail, setUserDetail } from '../store/auth/auth.actions';
import { LocalStorageService } from './local-storage.service';
import { UserDetailForUpdate } from '../models/dtos/userDetailForUpdate';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userDetailDto$: Observable<UserDetailDto | undefined> = this.store
    .select((s) => s.appAuth)
    .pipe(map((b) => b.userDetailDto));

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {}

  login(
    userForLoginDto: UserForLoginDto
  ): Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      environment.apiUrl + 'auth/login',
      userForLoginDto
    );
  }

  logout() {
    this.localStorageService.remove('tokenModel');
    this.localStorageService.remove('userMail');
    this.store.dispatch(deleteUserDetail());
  }

  register(
    userForRegisterDto: UserForRegisterDto
  ): Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      environment.apiUrl + 'auth/register',
      userForRegisterDto
    );
  }

  update(userDetailForUpdate: UserDetailForUpdate): Observable<ResponseModel> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      environment.apiUrl + 'auth/update',
      userDetailForUpdate
    );
  }

  isAuthenticated(
    userMail?: string | null,
    requiredRoles?: string[]
  ): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(
      environment.apiUrl + 'auth/isauthenticated',
      {
        params:
          userMail && requiredRoles
            ? {
                userMail: userMail,
                requiredRoles: requiredRoles.join(','),
              }
            : {},
      }
    );
  }

  setUserDetail(userDetailDto: UserDetailDto) {
    this.store.dispatch(setUserDetail({ userDetailDto: userDetailDto }));
  }

  deleteUserDetail() {
    this.store.dispatch(deleteUserDetail());
  }
}
