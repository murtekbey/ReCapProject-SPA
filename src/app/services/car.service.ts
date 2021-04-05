import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/entities/car';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private httpClient: HttpClient) {}

  getCarById(carId: number): Observable<SingleResponseModel<Car>> {
    let newPath = environment.apiUrl + 'cars/getbyid?carId=' + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  add(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'cars/add',
      car
    );
  }

  update(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'cars/update',
      car
    );
  }

  delete(car: Car) {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'cars/delete',
      car
    );
  }
}
