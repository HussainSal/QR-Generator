import { Controller, Post } from '@nestjs/common';
import { SocialMediaService } from './social-media.service';

@Controller('social-media')
export class SocialMediaController {
  constructor(private socialMediaService: SocialMediaService) {}

  @Post()
  async create() {
    const res = this.socialMediaService.create();

    return res;
  }
}
