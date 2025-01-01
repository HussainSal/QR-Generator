import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import SocialMediaEntity from './entity/socialMedia.entity';
import { CreateSocialMediaDTO } from './dto/CreateSocialMedia.dto';
import { QrcodetypeModule } from '../qrcodetype/qrcodetype.module';
import { QrcodetypeService } from '../qrcodetype/qrcodetype.service';
import { FileUploadService } from '../file-upload/file-upload.service';
import { CreateQrDto } from '../qrcodetype/dto/CreateQr.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SocialMediaService {
  private configService: InstanceType<typeof ConfigService>;

  constructor(
    @InjectRepository(SocialMediaEntity)
    private socialMediaRepository: Repository<SocialMediaEntity>,
    private qrService: QrcodetypeService,
    private fileUpload: FileUploadService,
  ) {
    this.configService = new ConfigService();
  }

  async create(payload: CreateSocialMediaDTO, user: string) {
    console.log(payload, 'PAYLOADDD');

    const image =
      payload.image && (await this.fileUpload.uploadFile(payload.image));

    let socialMediaPayload = {
      ...payload,
      image: image ? image.fileUrl : null,
      imageId: image ? image.assetId : null,
      user: { id: user },
      createAt: new Date().toISOString(),
    };

    const document = await this.socialMediaRepository
      .create(socialMediaPayload)
      .save();

    const qrPayload: CreateQrDto = {
      name: document.title,
      link: `${this.configService.get('NEXT_URL')}/socialmedia/${document.id}`,
      userId: user,
      serviceId: document.id,
    };

    const qrCode = await this.qrService.createQr(qrPayload);
    console.log(qrCode, 'QRCODEEEEE');
    return { vcard: document, qrCode: qrCode };
  }
}
