import { Injectable } from '@nestjs/common';
import * as QrCode from 'qrcode';  // Use the correct library import

@Injectable()
export class QrcodetypeService {
  constructor() {}

  async createQr() {
    // Creating the data
    let data = {
      name: 'Employee Name',
      age: 27,
      department: 'Police',
      id: 'aisuoiqu3234738jdhf100223',
    };

    console.log(data, 'DATAAAA');
    // Converting the data into String format
    let stringdata = JSON.stringify(data);
    
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

      // Printing the code
      console.log(code, 'code');
    });
  }
}
