import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/dtos/carDetailDto';
import { UserDetailDto } from 'src/app/models/dtos/userDetailDto';
import { CreditCard } from 'src/app/models/entities/creditCard';
import { Payment } from 'src/app/models/entities/payment';
import { Rental } from 'src/app/models/entities/rental';
import { AuthService } from 'src/app/services/auth.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  userDetailDto!: UserDetailDto;
  creditCardForm: FormGroup;
  creditCards?: CreditCard[] = [];
  selectedCreditCard?: CreditCard;

  rental: Rental;
  totalPrice: number;
  dataLoaded = false;

  constructor(
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private creditCardService: CreditCardService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authService.userDetailDto$.subscribe((userDetailDto) => {
      if (userDetailDto) {
        this.userDetailDto = userDetailDto;
        this.getCreditCardsByUserId();
        this.createCreditCardForm();
        this.loadData();
      }
    });
  }

  createCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      userId: [this.userDetailDto.userId, Validators.required],
      cardName: [''.toUpperCase(), Validators.required],
      cardNumber: [
        '',
        [Validators.required, Validators.pattern('^((?!(0))[0-9]{16})$')],
      ],
      expiryMonth: [
        '',
        [Validators.required, Validators.pattern('^([0-9]{2})$')],
      ],
      expiryYear: [
        '',
        [Validators.required, Validators.pattern('^([0-9]{2})$')],
      ],
      cvv: ['', [Validators.required, Validators.pattern('^([0-9]{3})$')]],
    });
  }

  getCreditCardsByUserId() {
    this.creditCardService.getAllByUserId(this.userDetailDto.userId).subscribe((response) => {
      this.creditCards = response.data;
      console.log(this.creditCards);
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
          customerId: this.userDetailDto.customerId,
          amount: this.totalPrice,
        };
        this.paymentService.addPayment(payment).subscribe(
          () => {
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
        this.askSaveCreditCard();
      },
      (err) => {
        this.toastrService.warning(err.error.message);
      }
    );
  }

  askSaveCreditCard() {
    if (!this.selectedCreditCard)
      if (window.confirm('Would you like to save your credit card?')) {
        let newCreditCard: CreditCard = {
          customerId: this.userDetailDto.customerId,
          ...this.creditCardForm.value,
        };
        this.saveCreditCard(newCreditCard);
      }
  }

  saveCreditCard(creditCard: CreditCard) {
    this.creditCardService.add(creditCard).subscribe((response) => {
      this.toastrService.success(response.message);
    });
  }

  fillCardInformation(selectedCreditCard: CreditCard) {
    this.selectedCreditCard = selectedCreditCard;
    if (this.selectedCreditCard)
      this.creditCardForm.patchValue({ ...this.selectedCreditCard });
    else this.creditCardForm.reset();
  }
}
