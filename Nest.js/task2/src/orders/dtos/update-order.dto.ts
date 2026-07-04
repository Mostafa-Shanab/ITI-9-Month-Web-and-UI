import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber, IsEnum, IsPositive } from "class-validator";
import { PaymentMethod } from "../entities/order.entity";

export class UpdateOrderDto {
  @ApiProperty({ required: false, description: "The order amount" })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount?: number;

  @ApiProperty({ required: false, description: "The longitude coordinate" })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty({ required: false, description: "The latitude coordinate" })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({ required: false, description: "The ID of the client" })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  clientId?: number;

  @ApiProperty({
    enum: PaymentMethod,
    required: false,
    description: "The payment method (Cash or Visa)",
  })
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;
}
