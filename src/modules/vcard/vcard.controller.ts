import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
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
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

@ApiTags('Vcard')
@Controller('vcard')
export class VcardController {
  constructor(private vcardService: VcardService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'welcomeScreen', maxCount: 1 },
    ]),
  )
  async createVcard(
    @GetUser() user: User,
    @Body() createVcardDto: CreateVcardDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File | null;
      welcomeScreen?: Express.Multer.File | null;
    },
  ): Promise<{ vcard: VCard; qrCode: QrCode }> {
    console.log(files, 'FILES_CHECK');
    const vcard = await this.vcardService.create(
      {
        ...createVcardDto,
        image: files?.image[0],
        welcomeScreen: files?.welcomeScreen[0],
      },
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
