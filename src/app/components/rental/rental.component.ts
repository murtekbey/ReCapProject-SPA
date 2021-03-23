import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RentalDetailDto } from 'src/app/models/dtos/rentalDetailDto';
import { Rental } from 'src/app/models/entities/rental';
import { RentalDetailService } from 'src/app/services/rental-detail.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  deliverForm: FormGroup;
  rentalDetails: RentalDetailDto[] = [];
  rental: Rental[] = [];
  returnDate: Date;
  dataLoaded = false;

  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private rentalDetailService: RentalDetailService,
    private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getRentals();
    this.deliverRentalForm();
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', animation: true })
      .result.then(
        (result) => {
          this.deliverCar();
          this.closeResult = `Ödeme gerçekleşti ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  deliverRentalForm() {
    this.deliverForm = this.formBuilder.group({
      rentalId: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  getRentals() {
    this.rentalDetailService.getRentalDetails().subscribe((response) => {
      this.rentalDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getRentalsById(rentalId: number) {
    this.rentalService.getRentalById(rentalId).subscribe((response) => {
      this.rental = response.data;
    });
  }

  deliverCar() {
    if (this.deliverForm.valid) {
      let deliverModel = Object.assign({}, this.deliverForm.value);
      this.rentalService.deliverCar(deliverModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Araç teslim edildi');
        },
        (responseError) => {
          console.log(responseError);
        }
      );
    } else {
      this.toastrService.error('Tüm alanları doldurmak zorunludur', 'Uyarı');
    }
  }

  getReturnMinDate() {
    var today = new Date();
    //min="1980-01-01"
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0, 10);
  }
}
