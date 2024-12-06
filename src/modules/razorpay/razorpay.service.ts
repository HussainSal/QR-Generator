import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RazorPayEntity } from './entity/razorpay.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { razorPayInstance } from './instance/RazorPay.instance';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class RazorpayService {
  private configureService: InstanceType<typeof ConfigService>;

  constructor(
    @InjectRepository(RazorPayEntity)
    private razorpayService: Repository<RazorPayEntity>,
  ) {
    this.configureService = new ConfigService();
  }

  async orderCreation(payload: OrderDto) {
    // let options = {
    //   amount: payload.amount,
    //   currency: 'INR',
    // };

    console.log(payload, 'payload');

    const order = await razorPayInstance.orders.create(payload);
    console.log(order, 'ORDER');

    return order;
  }
}
