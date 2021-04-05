import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/dtos/carDetailDto';
import { Payment } from 'src/app/models/entities/payment';
import { Rental } from 'src/app/models/entities/rental';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  rental: Rental;
  payment: Payment;
  car: CarDetailDto[] = [];
  totalPrice: number;
  dataLoaded = false;

  constructor(
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createPaymentForm();
    this.loadData();
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardNumber: [
        '',
        [Validators.required, Validators.pattern("^((?!(0))[0-9]{16})$")],
      ],
      expiryMonth: [
        '',
        [Validators.required, Validators.pattern('^([0-9]{2})$')],
      ],
      expiryYear: [
        '',
        [Validators.required, Validators.pattern('^([0-9]{2})$')],
      ],
      cvvCode: [
        '',
        [Validators.required, Validators.pattern('^([0-9]{3})$')],
      ],
    });
  }

  loadData() {
    this.rental = this.paymentService.getRental();
    this.totalPrice = this.paymentService.getTotalPrice();
    this.dataLoaded = true;
  }

  add() {
    this.rentalService.addRentals(this.rental).subscribe(
      () => {
        let payment: any = {
          carId: this.rental.carId,
          customerId: 1,
          amount: this.totalPrice,
        };
        this.paymentService.addPayment(payment).subscribe(
          (response) => {
            this.toastrService.success(
              'Ödeme işlemi tamamlandı, Anasayfaya yönlendiriliyorsunuz..',
              'Başarılı'
            );
            setTimeout(() => {
              this.router.navigate(['']);
            }, 2000);
          },
          (err) => {
            this.toastrService.warning(err.error.message);
          }
        );
      },
      (err) => {
        this.toastrService.warning(err.error.message);
      }
    );
  }
}
