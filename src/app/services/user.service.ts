import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDetailDto } from '../models/dtos/userDetailDto';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUserDetailByEmail(
    userMail: string
  ): Observable<SingleResponseModel<UserDetailDto>> {
    return this.httpClient.get<SingleResponseModel<UserDetailDto>>(
      environment.apiUrl + 'users/getuserdetailbymail',
      {
        params: {
          userMail: userMail,
        },
      }
    );
  }
}
