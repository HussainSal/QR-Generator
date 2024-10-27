import { Module } from '@nestjs/common';
import { QrcodetypeController } from './qrcodetype.controller';
import { QrcodetypeService } from './qrcodetype.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QrCode as QrCodeEntity } from './entity/qrcode.entity';

@Module({
  imports:[TypeOrmModule.forFeature([QrCodeEntity])],
  controllers: [QrcodetypeController],
  providers: [QrcodetypeService],
  exports: [QrcodetypeService], // Export the service
})

export class QrcodetypeModule {
  
}
