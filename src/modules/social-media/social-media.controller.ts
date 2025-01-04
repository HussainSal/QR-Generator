import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiConsumes } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateSocialMediaDTO } from './dto/CreateSocialMedia.dto';
import { GetUser } from '../auth/get-user-decoratore';
import { User } from '../users/entity/user.entity';

@Controller('socialmedia')
export class SocialMediaController {
  constructor(private socialMediaService: SocialMediaService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'bgImage', maxCount: 1 },
      { name: 'welcomeScreen', maxCount: 1 },
    ]),
  )
  async create(
    @Body() body: CreateSocialMediaDTO,
    @GetUser() user: User,
    @UploadedFiles()
    files: {
      bgImage?: Express.Multer.File;
      welcomeScreen?: Express.Multer.File;
    },
  ) {
    const result = this.socialMediaService.create(
      {
        ...body,
        image: files?.bgImage[0],
        welcomeScreen: files?.welcomeScreen[0],
      },
      user.id,
    );

    return result;
  }
}
