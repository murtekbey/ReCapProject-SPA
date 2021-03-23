import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/dtos/carDetailDto';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetail: CarDetailDto;
  dataLoaded = false;
  imageBasePath = environment.baseUrl;

  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarsById(params['carId']);
      }
    });
  }

  getCarsById(carId: number) {
    this.carDetailService.getCarById(carId).subscribe((response) => {
      this.carDetail = response.data[0];
      this.dataLoaded = true;
    });
  }
}
