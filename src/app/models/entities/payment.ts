export interface Payment {
  paymentId: number;
  customerId: number;
  carId: number;
  amount: number;
  paymentDate: Date;
}
