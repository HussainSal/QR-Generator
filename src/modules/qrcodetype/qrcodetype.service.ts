import { Injectable } from '@nestjs/common';
import * as QrCode from 'qrcode'; // Use the correct library import
import { Repository } from 'typeorm';
import { QrCode as QrCodeEntity } from './entity/qrcode.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQrDto } from './dto/CreateQr.dto';
import { User } from '../users/entity/user.entity';

@Injectable()
export class QrcodetypeService {
  constructor(
    @InjectRepository(QrCodeEntity)
    private qrCodeRepository: Repository<QrCodeEntity>,
  ) {}

  async createQr(payload: CreateQrDto) {
    // Creating the data
    let data = {
      name: payload.name,
      createdAt: new Date().toISOString(),
      link: payload.link,
      scans: 0,
      activeDuration: 0,
      user: { id: payload.userId },
      serviceId: { id: payload.serviceId },
    };

    console.log(data, 'datadata');

    let stringdata = JSON.stringify(data?.link);
    let generatedQr = '';
    // Print the QR code to terminal
    QrCode.toString(stringdata, { type: 'terminal' }, function (err, QRcode) {
      if (err) {
        console.log('error occurred');
        return;
      }
      // Printing the generated code
      console.log(QRcode, 'QRcode');
    });

    // Converting the data into base64
    QrCode.toDataURL(stringdata, function (err, code) {
      if (err) {
        console.log('error occurred');
        return;
      }
      generatedQr = code;
      console.log(code, 'coddddeeeee');
    });
    const qrCompleted = { ...data, qrCode: generatedQr };
    console.log(qrCompleted, 'qrCompleted');
    const qr = this.qrCodeRepository.create(qrCompleted);
    const res = await this.qrCodeRepository.save(qr);

    return res;
  }
}
