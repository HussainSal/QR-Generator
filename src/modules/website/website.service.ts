import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { WebsiteEntity } from './entitiy/Website.entity';
import { Repository } from 'typeorm';
import { CreateWebsiteDto } from './dto/createWebsite.dto';
import { CreateQrDto } from '../qrcodetype/dto/CreateQr.dto';
import { QrcodetypeService } from '../qrcodetype/qrcodetype.service';

@Injectable()
export class WebsiteService {
  private configService: InstanceType<typeof ConfigService>;

  constructor(
    @InjectRepository(WebsiteEntity)
    private websiteEntity: Repository<WebsiteEntity>,
    private qrService: QrcodetypeService,
  ) {
    this.configService = new ConfigService();
  }

  async create(payload: CreateWebsiteDto, userId: string) {
    const website = this.websiteEntity.create(payload);
    const res = await website.save();

    const qrPayload: CreateQrDto = {
      name: 'pdf',
      link: `${this.configService.get('NEXT_URL')}/${res.id}`,
      userId: userId,
      serviceId: res.id,
    };

    const qrCode = await this.qrService.createQr(qrPayload);
    return { website: res, qrCode: qrCode };
  }
}
