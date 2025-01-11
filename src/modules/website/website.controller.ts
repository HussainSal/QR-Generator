import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { WebsiteService } from './website.service';
import { CreateWebsiteDto } from './dto/createWebsite.dto';
import { GetUser } from '../auth/get-user-decoratore';
import { User } from '../users/entity/user.entity';

@ApiTags('Website')
@Controller('website')
export class WebsiteController {
  constructor(private websiteService: WebsiteService) {}

  @Post()
  @UseGuards(AuthGuard())
  // @ApiConsumes('multipart/form-data')
  async create(@Body() body: CreateWebsiteDto, @GetUser() user: User) {
    console.log(body, 'BODY__HERE');
    const website = await this.websiteService.create(body, user?.id);
    return website;
  }
}
