import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { BrandComponent } from './components/admin/brand/brand.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/admin/color/color.component';
import { CustomerComponent } from './components/admin/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/admin/car-admin/car-add/car-add.component';
import { BrandAddComponent } from './components/admin/brand/brand-add/brand-add.component';
import { ColorAddComponent } from './components/admin/color/color-add/color-add.component';
import { BrandUpdateComponent } from './components/admin/brand/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/admin/color/color-update/color-update.component';
import { CarAdminComponent } from './components/admin/car-admin/car-admin.component';
import { CarUpdateComponent } from './components/admin/car-admin/car-update/car-update.component';
import { LoginComponent } from './components/user/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/user/register/register.component';

const routes: Routes = [
  { path: '', component: CarComponent },

  { path: 'admin/brands', component: BrandComponent, canActivate:[LoginGuard] },
  { path: 'admin/brands/add', component: BrandAddComponent, canActivate:[LoginGuard] },
  { path: 'admin/brands/update/:brandId', component: BrandUpdateComponent, canActivate:[LoginGuard] },

  { path: 'admin/colors', component: ColorComponent, canActivate:[LoginGuard] },
  { path: 'admin/colors/add', component: ColorAddComponent, canActivate:[LoginGuard] },
  { path: 'admin/colors/update/:colorId', component: ColorUpdateComponent, canActivate:[LoginGuard] },

  { path: 'admin/cars', component: CarAdminComponent, canActivate:[LoginGuard] },
  { path: 'admin/cars/add', component: CarAddComponent, canActivate:[LoginGuard] },
  { path: 'admin/cars/update/:carId', component: CarUpdateComponent, canActivate:[LoginGuard] },

  { path: 'admin/customers', component: CustomerComponent, canActivate:[LoginGuard] },

  { path: 'about', component: AboutComponent },
  { path: 'payments', component: PaymentComponent },

  { path: 'cars', component: CarComponent },
  { path: 'cars/detail/:carId', component: CarDetailComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/:colorId/:brandId', component: CarComponent },

  { path: 'rentals', component: RentalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
