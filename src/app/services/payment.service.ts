import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/entities/payment';
import { Rental } from '../models/entities/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  rental:Rental;
  totalPrice:number;

  constructor(private httpClient:HttpClient) { }
  
  addPayment(payment: Payment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'payments/add',
      payment
    );
  }

  getRental(){
    return this.rental;
  }
  
  getTotalPrice(){
    return this.totalPrice;
  }

  setRental(rental:Rental, totalPrice:number){
    this.rental=rental;
    this.totalPrice=totalPrice;
  }
}
