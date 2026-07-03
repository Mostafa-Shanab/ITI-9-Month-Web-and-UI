export enum PaymentMethod {
  CASH = 'Cash',
  VISA = 'Visa',
}

export class Order {
  id: string;
  amount: number;
  longitude: number;
  latitude: number;
  clientId: number;
  paymentMethod: PaymentMethod;
}
