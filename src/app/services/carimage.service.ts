import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarImage } from '../models/entities/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarimageService {
  constructor(private httpClient: HttpClient) {}

  getPhotosbyCarId(carId: number): Observable<ListResponseModel<CarImage>> {
    let newPath = environment.apiUrl + 'carimages/photosbycar?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
