import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/entities/car';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private httpClient: HttpClient) {}

  add(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'cars/add',
      car
    );
  }
}
