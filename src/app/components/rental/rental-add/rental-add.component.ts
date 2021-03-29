import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/dtos/carDetailDto';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

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

  @Input()
  carDetail: CarDetailDto;

  @Input()
  imageBasePath: string;

  constructor(
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private router: Router,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {}

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', animation: true })
      .result.then(
        () => {
          let rental: any = {
            carId: this.carDetail.carId,
            customerId: 1,
            rentDate: this.rentDate,
            returnDate: this.returnDate,
          };
          this.paymentService.setRental(rental, this.totalPrice);

          this.toastrService.success(
            'Ödeme sayfasına yönlendiriliyorsunuz.',
            'Başarılı'
          );
          setTimeout(() => {
            this.router.navigate(['/payments']);
          }, 2000);
        },
        (reason) => {
          this.toastrService.error(reason, 'Hata!');
        }
      );
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
    } else {
      var difference = date1.getTime() - date2.getTime();
      var days = Math.ceil(difference / (1000 * 3600 * 24));
      this.totalPrice = this.carDetail.dailyPrice * days;
      this.formControl = true;
    }
  }

  getRentMinDate() {
    var today = new Date();
    //min="1980-01-01"
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0, 10);
  }
  getReturnMinDate() {
    var today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0, 10);
  }
}
