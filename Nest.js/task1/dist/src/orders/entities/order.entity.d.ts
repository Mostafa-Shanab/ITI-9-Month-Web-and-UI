export declare enum PaymentMethod {
    CASH = "Cash",
    VISA = "Visa"
}
export declare class Order {
    id: string;
    amount: number;
    longitude: number;
    latitude: number;
    clientId: number;
    paymentMethod: PaymentMethod;
}
