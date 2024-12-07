import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { RazorpayService } from './razorpay.service';
import { OrderDto } from './dto/order.dto';
import { Response } from 'express';
import { VerificationDto } from './dto/verification.dto';

@Controller('razorpay')
export class RazorpayController {
  constructor(private razorPayService: RazorpayService) {}

  @Post('order')
  async order(@Body() body: OrderDto) {
    console.log(body, 'BODYYYY');
    const order = await this.razorPayService.orderCreation(body);
    return order;
  }

  @Post('verification')
  async verification(@Body() body: VerificationDto, @Res() res: Response) {
    console.log(body, 'VERIFICAITON_IN_PROG');
    const verification = await this.razorPayService.verifyPayment(body);

    return res.redirect(
      verification
        ? 'http://localhost:3000/payment-success'
        : 'http://localhost:3000/payment-failed',
    );
  }
}
