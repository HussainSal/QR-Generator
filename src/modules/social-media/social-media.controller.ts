import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateSocialMediaDTO } from './dto/CreateSocialMedia.dto';
import { GetUser } from '../auth/get-user-decoratore';
import { User } from '../users/entity/user.entity';

@Controller('socialmedia')
export class SocialMediaController {
  constructor(private socialMediaService: SocialMediaService) {}

  @Post()
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor(''))
  @ApiConsumes('multipart/form-data')
  async create(@Body() body: CreateSocialMediaDTO, @GetUser() user: User) {
    const result = this.socialMediaService.create(body, user.id);

    return result;
  }
}
