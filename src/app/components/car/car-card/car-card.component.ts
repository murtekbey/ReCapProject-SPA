import { Component, Input, OnInit } from '@angular/core';
import { CarDetailDto } from 'src/app/models/dtos/carDetailDto';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css'],
})
export class CarCardComponent implements OnInit {
  @Input()
  carDetails: CarDetailDto[] = [];
  @Input()
  imageBasePath: string;
  constructor() {}

  ngOnInit(): void {
  }
}
