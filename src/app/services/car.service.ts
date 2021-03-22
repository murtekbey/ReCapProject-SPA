import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private httpClient: HttpClient) {}

  getCarDetails(): Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(
      environment.apiUrl + 'cars/details/'
    );
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>> {
    let newPath = environment.apiUrl + 'cars/detailsbybrand?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = environment.apiUrl + 'cars/detailsbycolor?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColorAndBrand(colorId: number, brandId: number): Observable<ListResponseModel<Car>> {
    let newPath = environment.apiUrl + 'cars/detailsbycolorandbrand?colorId=' + colorId + '&brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  
}
