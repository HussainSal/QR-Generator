import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PdfEntity } from './entity/Pdf.entity';
import { Repository } from 'typeorm';
import { CreatePdfDto } from './dto/CreatePdfDto.dto';
import { User } from '../users/entity/user.entity';
import { CreateQrDto } from '../qrcodetype/dto/CreateQr.dto';
import { ConfigService } from '@nestjs/config';
import { QrcodetypeService } from '../qrcodetype/qrcodetype.service';

@Injectable()
export class PdfService {
  private configService: InstanceType<typeof ConfigService>;

  constructor(
    @InjectRepository(PdfEntity)
    private pdfRepository: Repository<PdfEntity>,
    private qrService: QrcodetypeService,
  ) {
    this.configService = new ConfigService();
  }

  async createPdf(payload: CreatePdfDto, user: string): Promise<any> {
    console.log(payload, 'payload');

    const pdf = this.pdfRepository.create({ ...payload, user: { id: user } });
    const res = await pdf.save();

    const qrPayload: CreateQrDto = {
      name: 'pdf',
      link: `${this.configService.get('NEXT_URL')}/${user}/${pdf.id}`,
      userId: user,
      serviceId: pdf.id,
    };

    const qrCode = await this.qrService.createQr(qrPayload);

    return res;
  }
}
