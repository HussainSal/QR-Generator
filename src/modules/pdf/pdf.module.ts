import { forwardRef, Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfEntity } from './entity/Pdf.entity';
import { QrcodetypeModule } from '../qrcodetype/qrcodetype.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([PdfEntity]),forwardRef(() => AuthModule),QrcodetypeModule],
  providers: [PdfService],
  controllers: [PdfController]
})
export class PdfModule {}
