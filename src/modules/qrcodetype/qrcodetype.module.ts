import { Module } from '@nestjs/common';
import { QrcodetypeController } from './qrcodetype.controller';
import { QrcodetypeService } from './qrcodetype.service';

@Module({
  controllers: [QrcodetypeController],
  providers: [QrcodetypeService]
})
export class QrcodetypeModule {
  
}
