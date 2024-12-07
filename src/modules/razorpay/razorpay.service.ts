import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RazorPayEntity } from './entity/razorpay.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { razorPayInstance } from './instance/RazorPay.instance';
import { OrderDto } from './dto/order.dto';
import { VerificationDto } from './dto/verification.dto';
// import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils';
import crypto from 'crypto';

function validatePaymentVerification(
  { order_id, payment_id }: { order_id: string; payment_id: string },
  signature: string,
  secret: string,
): boolean {
  const body = order_id + '|' + payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  console.log(expectedSignature, 'expectedSignature', signature);
  return expectedSignature === signature;
}

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
    const order = await razorPayInstance.orders.create(payload);
    return order;
  }

  async verifyPayment(payload: VerificationDto) {
    const secret = this.configureService.get('RAZORPAY_SECRET');

    const verification = validatePaymentVerification(
      {
        payment_id: payload.razorpay_payment_id,
        order_id: payload.razorpay_order_id,
      },
      payload.razorpay_signature,
      secret,
    );

    console.log(verification, 'verification', payload, secret);

    if (verification) {
      return true;
    } else {
      return false;
    }
  }
}
