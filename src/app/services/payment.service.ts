import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rental } from '../models/entities/rental';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  rental:Rental;
  totalPrice:number;

  constructor(private httpClient:HttpClient) { }
  
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
