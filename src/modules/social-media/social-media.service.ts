import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import SocialMediaEntity from './entity/socialMedia.entity';

@Injectable()
export class SocialMediaService {
  constructor(
    @InjectRepository(SocialMediaEntity)
    private socialMediaRepository: Repository<SocialMediaEntity>,
  ) {}

  async create() {}
}
