import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/entities/brand';
import { Color } from 'src/app/models/entities/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css'],
})
export class CarFilterComponent implements OnInit {
  colors: Color[] = [];
  brands: Brand[] = [];
  filterColor: number;
  filterBrand: number;
  selectedColor: number;
  selectedBrand: number;

  constructor(
    private colorService: ColorService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getSelectedColor(colorId: number) {
    if (this.filterColor == colorId) {
      return true;
    }
    return false;
  }
  getSelectedBrand(brandId: number) {
    if (this.filterBrand == brandId) {
      return true;
    }
    return false;
  }
  setSelectedColor(colorId: number) {
    this.selectedColor = colorId;
  }
  setSelectedBrand(brandId: number) {
    this.selectedBrand = brandId;
  }
}
