import { forwardRef, Module } from '@nestjs/common';
import { VcardController } from './vcard.controller';
import { VcardService } from './vcard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VCard } from './entity/vcard.entitiy';
import { AuthModule } from '../auth/auth.module';
import { QrcodetypeService } from '../qrcodetype/qrcodetype.service';
import { QrcodetypeModule } from '../qrcodetype/qrcodetype.module';
import { FileUploadService } from '../file-upload/file-upload.service';
import { FileUploadModule } from '../file-upload/file-upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VCard]),
    forwardRef(() => AuthModule),
    QrcodetypeModule,
    FileUploadModule,
  ],
  controllers: [VcardController],
  providers: [VcardService],
})
export class VcardModule {}
