import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/dtos/carDetailDto';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { UserDetailDto } from 'src/app/models/dtos/userDetailDto';
import { AuthService } from 'src/app/services/auth.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})
export class RentalAddComponent implements OnInit {
  rentDate!: Date;
  returnDate!: Date;
  totalPrice: number;
  formControl: boolean = false;
  userDetailDto!: UserDetailDto;

  @Input()
  carDetail: CarDetailDto;

  @Input()
  imageBasePath: string;

  constructor(
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private router: Router,
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authService.userDetailDto$.subscribe((userDetailDto) => {
      if (userDetailDto) {
        this.userDetailDto = userDetailDto;
      }
    });
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', animation: true })
      .result.then(() => {
        this.IsCarCanBeRented();
      })
      .catch(() => {
        return null;
      });
  }

  totalPriceCalculate() {
    var date1 = new Date(this.returnDate);
    var date2 = new Date(this.rentDate);
    if (date1.getTime() === date2.getTime()) {
      this.totalPrice = 0;
      this.formControl = false;
      this.toastrService.warning(
        'Aynı gün için kiralama işlemi gerçekleştirilemez.',
        'Uyarı'
      );
    } else if (date1 > date2) {
      var difference = date1.getTime() - date2.getTime();
      var days = Math.ceil(difference / (1000 * 3600 * 24));
      this.totalPrice = this.carDetail.dailyPrice * days;
      this.formControl = true;
    }
  }

  IsCarCanBeRented() {
    let rental: any = {
      carId: this.carDetail.carId,
      customerId: this.userDetailDto.customerId,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
    };

    this.rentalService.IsCarCanBeRented(rental).subscribe(
      () => {
        this.paymentService.setRental(rental, this.totalPrice);
        this.toastrService.success(
          'Ödeme sayfasına yönlendiriliyorsunuz.',
          'Başarılı'
        );
        setTimeout(() => {
          this.router.navigate(['/payments']);
        }, 2000);
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(
              responseError.error.Errors[i].ErrorMessage,
              'Doğrulama hatası'
            );
          }
        }
      }
    );
  }

  getRentMinDate() {
    var today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0, 10);
  }
  getReturnMinDate() {
    var today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0, 10);
  }
}
