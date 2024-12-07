import { IsString } from 'class-validator';

export class VerificationDto {
  @IsString()
  razorpay_payment_id: string;
  @IsString()
  razorpay_order_id: string;
  @IsString()
  razorpay_signature: string;
}

// razorpay_payment_id: 'pay_PU9HnHxNL8oFc6',
// razorpay_order_id: 'order_PU9HgZVDbfHGNx',
// razorpay_signature: 'b13139cfdf6f37d1dfbad98d375073352f8fa53ff6f62d2877ddf8f1d1204d9b'
