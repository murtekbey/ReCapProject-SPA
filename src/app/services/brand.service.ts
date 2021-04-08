import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/entities/brand';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(
      environment.apiUrl + 'brands'
    );
  }

  getBrandById(brandId: number): Observable<SingleResponseModel<Brand>> {
    return this.httpClient.get<SingleResponseModel<Brand>>(
      environment.apiUrl + 'brands/getbyid?brandId=' + brandId
    );
  }

  add(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'brands/add',
      brand
    );
  }

  update(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'brands/update',
      brand
    );
  }

  delete(brand: Brand) {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'brands/delete',
      brand
    );
  }
}
