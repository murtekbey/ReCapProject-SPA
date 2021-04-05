import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/entities/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  constructor(private httpClient: HttpClient) {}

  getAllByUserId(
    userId: number
  ): Observable<SingleResponseModel<CreditCard>> {
    return this.httpClient.get<SingleResponseModel<CreditCard>>(
      environment.apiUrl + 'creditcards/getallbyuserid?userId=' + userId
    );
  }

  add(creditCard: CreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'creditcards/add',
      creditCard
    );
  }

  update(creditCard: CreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'creditcards/update',
      creditCard
    );
  }

  delete(creditCard: CreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'creditcards/delete',
      creditCard
    );
  }
}
