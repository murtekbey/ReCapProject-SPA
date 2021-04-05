import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/entities/brand';
import { Car } from 'src/app/models/entities/car';
import { Color } from 'src/app/models/entities/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup;
  colors: Color[] = [];
  brands: Brand[] = [];
  car: Car;
  brandLoaded: boolean = false;
  colorLoaded: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarById(params['carId']);
        this.getBrands();
        this.getColors();
      }
    });
  }

  createCarUpdateForm(car: Car) {
    this.carUpdateForm = this.formBuilder.group({
      carId: [car.carId, Validators.required],
      brandId: [car.brandId, Validators.required],
      colorId: [car.colorId, Validators.required],
      modelYear: [car.modelYear, Validators.required],
      dailyPrice: [car.dailyPrice, Validators.required],
      findeksScore: [car.findeksScore, [Validators.required, Validators.min(0), Validators.max(2500)]],
      description: [car.description, Validators.required],
    });
  }

  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.car = response.data;
      this.createCarUpdateForm(this.car);
    });
  }

  update() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      console.log(carModel);
      this.carService.update(carModel).subscribe(
        (response) => {
          setTimeout(() => {
            this.router.navigate(['admin/cars']);
          }, 1000);
          this.toastrService.success(response.message, 'Başarılı');
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
    } else {
      this.toastrService.error('Girdiğiniz bilgiler hatalı veya zorunlu alanları doldurmadınız', 'Uyarı');
    }
  }

  delete() {
    console.log(this.car);
    this.carService.delete(this.car).subscribe(
      (response) => {
        setTimeout(() => {
          this.router.navigate(['admin/cars']);
        }, 1000);
        this.toastrService.info(response.message, 'Başarılı');
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

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.brandLoaded = true;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.colorLoaded = true;
    });
  }
}
