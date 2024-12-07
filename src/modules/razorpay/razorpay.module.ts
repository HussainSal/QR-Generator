import { Module } from '@nestjs/common';
import { RazorpayController } from './razorpay.controller';
import { RazorpayService } from './razorpay.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RazorPayEntity } from './entity/razorpay.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RazorPayEntity])],
  controllers: [RazorpayController],
  providers: [RazorpayService],
})
export class RazorpayModule {}
