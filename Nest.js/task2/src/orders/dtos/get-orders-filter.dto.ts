import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsEnum } from "class-validator";
import { Type } from "class-transformer";
import { PaymentMethod } from "../entities/order.entity";

export class GetOrdersFilterDto {
  @ApiPropertyOptional({ description: "Filter by client ID" })
  @IsOptional()
  @Type(() => Number)
  clientId?: number;

  @ApiPropertyOptional({
    enum: PaymentMethod,
    description: "Filter by payment method",
  })
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;
}
