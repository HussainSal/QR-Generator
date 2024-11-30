import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { WebsiteService } from './website.service';
import { CreateWebsiteDto } from './dto/createWebsite.dto';

@ApiTags('Website')
@Controller('website')
export class WebsiteController {
  constructor(private websiteService: WebsiteService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() body: CreateWebsiteDto) {
    const website = await this.websiteService.create(body);
    return website;
  }
}
