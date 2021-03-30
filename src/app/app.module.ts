import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NaviComponent } from './components/navi/navi.component';
import { FooterComponent } from './components/footer/footer.component';

import { BrandComponent } from './components/brand/brand.component';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';

import { ColorComponent } from './components/color/color.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';

import { RentalComponent } from './components/rental/rental.component';
import { RentalAddComponent } from './components/rental/rental-add/rental-add.component';

import { CarComponent } from './components/car/car.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarCardComponent } from './components/car/car-card/car-card.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarFilterComponent } from './components/car/car-filter/car-filter.component';

import { CustomerComponent } from './components/customer/customer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AboutComponent } from './components/about/about.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    FooterComponent,
    AboutComponent,

    BrandComponent,
    BrandAddComponent,

    ColorComponent,
    ColorAddComponent,

    RentalComponent,
    RentalAddComponent,

    CarComponent,
    CarAddComponent,
    CarCardComponent,
    CarDetailComponent,
    CarFilterComponent,

    CustomerComponent,
    PaymentComponent,
    BrandUpdateComponent,
    ColorUpdateComponent,
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
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
