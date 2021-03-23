import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarDetailDto } from '../models/dtos/carDetailDto';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarDetailService {
  constructor(private httpClient: HttpClient) {}

  getCarDetails(): Observable<ListResponseModel<CarDetailDto>> {
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(
      environment.apiUrl + 'cars/details/'
    );
  }

  getCarById(carId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = environment.apiUrl + 'cars/detailsbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = environment.apiUrl + 'cars/detailsbybrand?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = environment.apiUrl + 'cars/detailsbycolor?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarsByColorAndBrand(
    colorId: number,
    brandId: number
  ): Observable<ListResponseModel<CarDetailDto>> {
    let newPath =
      environment.apiUrl +
      'cars/detailsbycolorandbrand?colorId=' +
      colorId +
      '&brandId=' +
      brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }
}
