import { Body, Controller, Post, Req } from '@nestjs/common';
import { RazorpayService } from './razorpay.service';
import { OrderDto } from './dto/order.dto';

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
  async verification(@Body() body: any, @Req() req: any) {
    console.log(body, 'VERIFICAITON_IN_PROG', req.body);

    return body;
  }
}
