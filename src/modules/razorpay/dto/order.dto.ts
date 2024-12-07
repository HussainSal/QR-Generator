import { IsString } from 'class-validator';

export class OrderDto {
  @IsString()
  amount: string;
  @IsString()
  currency: string;
}
