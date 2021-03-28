import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/entities/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(
      environment.apiUrl + 'rentals'
    );
  }

  addRentals(rental: Rental): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'rentals/add',
      rental
    );
  }

  updateRentals(rental: Rental): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'rentals/update',
      rental
    );
  }

  deleteRentals(rental: Rental): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'rentals/delete',
      rental
    );
  }
}
