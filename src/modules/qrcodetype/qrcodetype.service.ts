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
    };
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
      // Printing the code
      console.log(code, 'code');
    });
    const qrCompleted = { ...data, qrCode: generatedQr, type: '' };
    console.log(qrCompleted, 'qrCompleted');
    const qr = this.qrCodeRepository.create(qrCompleted);
    await qr.save();
  }
  // async findAll (userId:string){
  //   const qr = this.qrCodeRepository.find({where:{}})
  // }
}
