import { Component, OnInit } from '@angular/core';
import { CarDetailDto } from 'src/app/models/dtos/carDetailDto';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-admin',
  templateUrl: './car-admin.component.html',
  styleUrls: ['./car-admin.component.css']
})
export class CarAdminComponent implements OnInit {
  carDetails: CarDetailDto[] = [];
  dataLoaded = false;
  imageBasePath = environment.baseUrl;

  constructor(private carDetailService:CarDetailService) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.carDetailService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
}
