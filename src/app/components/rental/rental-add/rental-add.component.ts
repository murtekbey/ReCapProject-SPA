import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from 'src/app/services/rental.service';
import { CarDetailDto } from 'src/app/models/dtos/carDetailDto';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { Rental } from 'src/app/models/entities/rental';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})
export class RentalAddComponent implements OnInit {
  rentalAddForm: FormGroup;
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
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private router: Router,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.createRentalAddForm();
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', animation: true })
      .result.then(
        () => {
          let rental:Rental = {
            rentalId: this.carDetail.carId,
            carId: this.carDetail.carId,
            customerId: 1,
            rentDate: this.rentDate,
            returnDate : this.returnDate
          };
          this.paymentService.setRental(rental, this.totalPrice)
          this.router.navigate(['/payments']);
        },
        (reason) => {
          console.log(reason);
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

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      carId: [this.carDetail.carId, Validators.required],
      customerId: [1, Validators.required],
      rentDate: [this.rentDate, Validators.required],
      returnDate: [this.returnDate, Validators.required],
    });
  }

  add() {
    if (this.rentalAddForm.valid) {
      let rentalModel = Object.assign({}, this.rentalAddForm.value);
      this.rentalService.addRentals(rentalModel).subscribe(
        (response) => {
          this.toastrService.success(
            response.message,
            'Araç başarıyla kiralandı'
          );
        },
        (responseError) => {
          console.log(responseError);
        }
      );
    } else {
      this.toastrService.error('Tüm alanları doldurmak zorunludur', 'Uyarı');
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
