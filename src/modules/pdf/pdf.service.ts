import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PdfEntity } from './entity/Pdf.entity';
import { Repository } from 'typeorm';
import { CreatePdfDto } from './dto/CreatePdfDto.dto';
import { User } from '../users/entity/user.entity';
import { CreateQrDto } from '../qrcodetype/dto/CreateQr.dto';
import { ConfigService } from '@nestjs/config';
import { QrcodetypeService } from '../qrcodetype/qrcodetype.service';
import { PdfResponseDto } from './dto/PdfResponse.dto';
import { FileUploadService } from '../file-upload/file-upload.service';

@Injectable()
export class PdfService {
  private configService: InstanceType<typeof ConfigService>;

  constructor(
    @InjectRepository(PdfEntity)
    private pdfRepository: Repository<PdfEntity>,
    private qrService: QrcodetypeService,
    private fileUpload: FileUploadService,
  ) {
    this.configService = new ConfigService();
  }

  async createPdf(
    payload: CreatePdfDto,
    user: string,
  ): Promise<PdfResponseDto> {
    console.log(payload, 'payload');

    const file = await this.fileUpload.uploadFile(payload.pdfFile);

    const welcomeScreen =
      payload.welcomeScreen &&
      (await this.fileUpload.uploadFile(payload.welcomeScreen));

    console.log(file, 'fileLink');
    const pdf = this.pdfRepository.create({
      ...payload,
      pdfFile: file.fileUrl,
      assetId: file.assetId,
      welcomeScreen: welcomeScreen?.fileUrl,
      user: { id: user },
    });
    const res = await pdf.save();

    const qrPayload: CreateQrDto = {
      name: 'pdf',
      link: `${this.configService.get('NEXT_URL')}/${pdf.id}`,
      userId: user,
      serviceId: pdf.id,
    };

    const qrCode = await this.qrService.createQr(qrPayload);

    return { pdf: res, qrCode: qrCode };
  }
}
