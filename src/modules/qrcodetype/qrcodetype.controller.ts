import { Body, Controller, Post } from '@nestjs/common';
import { QrcodetypeService } from './qrcodetype.service';
import { CreateQrDto } from './dto/CreateQr.dto';

@Controller('qrcodetype')
export class QrcodetypeController {
  constructor(private qrcodeService: QrcodetypeService) {}

  @Post('/')
  async createQr(@Body() createQr: CreateQrDto) {
    const res = this.qrcodeService.createQr(createQr);
    return res;
  }
}
