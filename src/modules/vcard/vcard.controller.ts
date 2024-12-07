import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { VcardService } from './vcard.service';
import { CreateVcardDto } from './dto/createVcardDto.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entity/user.entity';
import { GetUser } from '../auth/get-user-decoratore';
import { VCard } from './entity/vcard.entitiy';
import { QrCode } from '../qrcodetype/entity/qrcode.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Vcard')
@Controller('vcard')
export class VcardController {
  constructor(private vcardService: VcardService) {}

  @Post()
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  async createVcard(
    @GetUser() user: User,
    @Body() createVcardDto: CreateVcardDto,
    @UploadedFile() image?: Express.Multer.File | null,
  ): Promise<{ vcard: VCard; qrCode: QrCode }> {
    console.log(user, 'USER_INFO_CHECK');
    const vcard = await this.vcardService.create(
      { ...createVcardDto, image: image ? image : null },
      user.id,
    );
    console.log(vcard, 'VCARDDDD');
    return vcard;
  }

  @UseGuards(AuthGuard())
  @Get('/:id')
  async find(@Param('id') id: string, @GetUser() user: User): Promise<VCard> {
    console.log('CHECKINGGGG');
    const vcard = await this.vcardService.findOne(user.id, id);
    return vcard;
  }

  @UseGuards(AuthGuard())
  @Get()
  async findAll(@GetUser() user: User): Promise<VCard[]> {
    const vcard = await this.vcardService.findAll(user.id);
    return vcard;
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  async delete(@GetUser() user: User, @Param('id') id: string) {
    await this.vcardService.delete(id, user.id);
  }
}
