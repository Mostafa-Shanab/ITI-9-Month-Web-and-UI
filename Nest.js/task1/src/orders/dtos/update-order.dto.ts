import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsEnum, IsPositive } from 'class-validator';
import { PaymentMethod } from '../entities/order.entity';

export class UpdateOrderDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  clientId?: number;

  @ApiProperty({ enum: PaymentMethod, required: false })
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;
}
