import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FileUploadModule } from 'ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NaviComponent } from './components/navi/navi.component';
import { FooterComponent } from './components/footer/footer.component';

import { BrandComponent } from './components/admin/brand/brand.component';
import { BrandAddComponent } from './components/admin/brand/brand-add/brand-add.component';

import { ColorComponent } from './components/admin/color/color.component';
import { ColorAddComponent } from './components/admin/color/color-add/color-add.component';

import { RentalComponent } from './components/rental/rental.component';
import { RentalAddComponent } from './components/rental/rental-add/rental-add.component';

import { CarComponent } from './components/car/car.component';
import { CarAddComponent } from './components/admin/car-admin/car-add/car-add.component';
import { CarCardComponent } from './components/car/car-card/car-card.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarFilterComponent } from './components/car/car-filter/car-filter.component';

import { CustomerComponent } from './components/admin/customer/customer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AboutComponent } from './components/about/about.component';
import { BrandUpdateComponent } from './components/admin/brand/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/admin/color/color-update/color-update.component';
import { CarAdminComponent } from './components/admin/car-admin/car-admin.component';
import { CarUpdateComponent } from './components/admin/car-admin/car-update/car-update.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UpdateComponent } from './components/user/update/update.component';
import { StoreModule } from '@ngrx/store';
import { AppReducers } from './store/app.reducer';
import { CarImagesComponent } from './components/admin/car-admin/car-images/car-images.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    FooterComponent,
    AboutComponent,

    BrandComponent,
    BrandAddComponent,
    BrandUpdateComponent,

    ColorComponent,
    ColorAddComponent,
    ColorUpdateComponent,

    CarAdminComponent,
    CarAddComponent,

    CarComponent,
    CarCardComponent,
    CarDetailComponent,
    CarFilterComponent,

    RentalComponent,
    RentalAddComponent,

    CustomerComponent,
    PaymentComponent,
    CarUpdateComponent,
    LoginComponent,
    RegisterComponent,
    UpdateComponent,
    CarImagesComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FilterPipeModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FileUploadModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    StoreModule.forRoot(AppReducers),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
