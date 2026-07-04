import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsEnum, IsPositive } from "class-validator";
import { PaymentMethod } from "../entities/order.entity";

export class CreateOrderDto {
  @ApiProperty({ description: "The order amount" })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ description: "The longitude coordinate" })
  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @ApiProperty({ description: "The latitude coordinate" })
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: "The ID of the client placing the order" })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  clientId: number;

  @ApiProperty({
    enum: PaymentMethod,
    description: "The payment method (Cash or Visa)",
  })
  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}
