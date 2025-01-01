import { forwardRef, Module } from '@nestjs/common';
import { SocialMediaController } from './social-media.controller';
import { SocialMediaService } from './social-media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import SocialMediaEntity from './entity/socialMedia.entity';
import { AuthModule } from '../auth/auth.module';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { QrcodetypeModule } from '../qrcodetype/qrcodetype.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SocialMediaEntity]),
    forwardRef(() => AuthModule),
    FileUploadModule,
    QrcodetypeModule,
  ],
  controllers: [SocialMediaController],
  providers: [SocialMediaService],
})
export class SocialMediaModule {}
