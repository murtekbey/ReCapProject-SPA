import { CarImage } from '../entities/carImage';

export interface CarDetailDto {
  carId: number;
  brandName: string;
  colorName: string;
  modelYear: number;
  dailyPrice: number;
  findeksScore: number;
  description: string;
  image: CarImage[];
}
