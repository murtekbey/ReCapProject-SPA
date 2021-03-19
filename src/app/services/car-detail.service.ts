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
export class CarDetailService {
  constructor(private httpClient: HttpClient) {}

  getCarById(carId: number): Observable<ListResponseModel<Car>> {
    let newPath = environment.apiUrl + 'cars/detailsbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getPhotosbyCarId(carId: number): Observable<ListResponseModel<CarImage>> {
    let newPath = environment.apiUrl + 'carimages/photosbycar?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
