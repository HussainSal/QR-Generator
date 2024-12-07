import { forwardRef, Module } from '@nestjs/common';
import { WebsiteController } from './website.controller';
import { WebsiteService } from './website.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsiteEntity } from './entitiy/Website.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WebsiteEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [WebsiteController],
  providers: [WebsiteService],
})
export class WebsiteModule {}
