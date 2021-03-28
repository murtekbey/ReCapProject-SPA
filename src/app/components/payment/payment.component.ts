import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/entities/rental';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  car: Rental;
  totalPrice: number;
  test:String;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.car = this.paymentService.getRental();
    this.totalPrice = this.paymentService.getTotalPrice();
    this.test = 'Test';
  }
}
