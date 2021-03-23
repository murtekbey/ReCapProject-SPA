import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/dtos/carDetailDto';
import { CarImage } from 'src/app/models/entities/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  carDetails: CarDetailDto[] = [];
  carImages: CarImage[] = [];
  imageBasePath = environment.baseUrl;
  dataLoaded = false;
  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId'] && params['brandId']) {
        this.getCarsByColorAndBrand(params['colorId'], params['brandId']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCars();
      }
    });
  }

  getCars() {
    this.carDetailService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carDetailService.getCarsByBrand(brandId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: number) {
    this.carDetailService.getCarsByColor(colorId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColorAndBrand(colorId: number, brandId: number) {
    this.carDetailService
      .getCarsByColorAndBrand(colorId, brandId)
      .subscribe((response) => {
        this.carDetails = response.data;
        this.dataLoaded = true;
      });
  }
}
