import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';

const routes: Routes = [
  { path: '', component: CarComponent },
  { path: 'about', component: AboutComponent },
  { path: 'payments', component: PaymentComponent },

  { path: 'cars', component: CarComponent },
  { path: 'cars/add', component: CarAddComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/:colorId/:brandId', component: CarComponent },
  { path: 'cars/detail/:carId', component: CarDetailComponent },

  { path: 'brands', component: BrandComponent },
  { path: 'brands/add', component: BrandAddComponent },
  { path: 'brands/update/:brandId', component: BrandUpdateComponent },

  { path: 'colors', component: ColorComponent },
  { path: 'colors/add', component: ColorAddComponent },
  { path: 'colors/update', component: ColorUpdateComponent },

  { path: 'customers', component: CustomerComponent },
  { path: 'rentals', component: RentalComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
