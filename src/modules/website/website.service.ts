import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { WebsiteEntity } from './entitiy/Website.entity';
import { Repository } from 'typeorm';
import { CreateWebsiteDto } from './dto/createWebsite.dto';

@Injectable()
export class WebsiteService {
  private configService: InstanceType<typeof ConfigService>;

  constructor(
    @InjectRepository(WebsiteEntity)
    private websiteEntity: Repository<WebsiteEntity>,
  ) {
    this.configService = new ConfigService();
  }

  async create(payload: CreateWebsiteDto) {
    const website = this.websiteEntity.create(payload);
    const res = await website.save();
    return res;
  }
}
