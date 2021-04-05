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
import { UpdateComponent } from './components/user/update/update.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', component: CarComponent },

  {
    path: 'admin',
    canActivate: [LoginGuard, AdminGuard],
    children: [
      { path: 'brands', component: BrandComponent },
      { path: 'brands/add', component: BrandAddComponent },
      { path: 'brands/update/:brandId', component: BrandUpdateComponent },

      { path: 'colors', component: ColorComponent },
      { path: 'colors/add', component: ColorAddComponent },
      { path: 'colors/update/:colorId', component: ColorUpdateComponent },

      { path: 'cars', component: CarAdminComponent },
      { path: 'cars/add', component: CarAddComponent },
      { path: 'cars/update/:carId', component: CarUpdateComponent },

      { path: 'customers', component: CustomerComponent },
    ],
  },

  { path: 'about', component: AboutComponent },
  { path: 'payments', component: PaymentComponent },

  { path: 'cars', component: CarComponent },
  { path: 'cars/detail/:carId', component: CarDetailComponent },
  { path: 'cars/:colorId/:brandId', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },

  { path: 'rentals', component: RentalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'update', component: UpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
