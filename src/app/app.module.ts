import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { CarFilterComponent } from './components/car/car-filter/car-filter.component';
import { RentalAddComponent } from './components/rental/rental-add/rental-add.component';
import { AboutComponent } from './components/about/about.component';
import { CarCardComponent } from './components/car/car-card/car-card.component';
import { PaymentComponent } from './components/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    CarComponent,
    CarDetailComponent,
    FooterComponent,
    CarFilterComponent,
    RentalAddComponent,
    AboutComponent,
    CarCardComponent,
    PaymentComponent,
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
