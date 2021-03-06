import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RentalDetailDto } from '../models/dtos/rentalDetailDto';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalDetailService {
  constructor(private httpClient: HttpClient) {}

  getRentalDetails(): Observable<ListResponseModel<RentalDetailDto>> {
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(
      environment.apiUrl + 'rentals/details'
    );
  }

  getRentalDetailsById(
    rentalId: number
  ): Observable<SingleResponseModel<RentalDetailDto>> {
    let newPath =
      environment.apiUrl + 'rentals/detailsbyrentalid?rentalId=' + rentalId;
    return this.httpClient.get<SingleResponseModel<RentalDetailDto>>(newPath);
  }
}
