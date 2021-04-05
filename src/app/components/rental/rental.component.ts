import { Component, OnInit } from '@angular/core';
import { RentalDetailDto } from 'src/app/models/dtos/rentalDetailDto';
import { RentalDetailService } from 'src/app/services/rental-detail.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentalDetails: RentalDetailDto[] = [];
  returnDate: Date;
  dataLoaded = false;

  constructor(private rentalDetailService: RentalDetailService) {}

  ngOnInit(): void {
    this.getRentals();
  }

  getRentals() {
    this.rentalDetailService.getRentalDetails().subscribe((response) => {
      this.rentalDetails = response.data;
      this.dataLoaded = true;
    });
  }
}
