import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/models/entities/car';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from 'src/app/services/rental.service';
import { CarDetailDto } from 'src/app/models/dtos/carDetailDto';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})
export class RentalAddComponent implements OnInit {
  rentalAddForm: FormGroup;
  closeResult = '';
  rentDate: Date;

  @Input()
  carDetail: CarDetailDto;

  @Input()
  imageBasePath: string;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createRentalAddForm();
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', animation: true })
      .result.then(
        (result) => {
          this.add();
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

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      carId: ['', Validators.required],
      customerId: [1, Validators.required],
      rentDate: ['', Validators.required],
    });
  }

  add() {
    if (this.rentalAddForm.valid) {
      let rentalModel = Object.assign({}, this.rentalAddForm.value);
      this.rentalService.addRentals(rentalModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
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
