import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PdfService } from './pdf.service';
import { CreatePdfDto } from './dto/CreatePdfDto.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user-decoratore';
import { User } from '../users/entity/user.entity';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PdfResponseDto } from './dto/PdfResponse.dto';

@ApiTags('Pdfs')
@Controller('pdf')
@UseGuards(AuthGuard())
export class PdfController {
  constructor(private pdfService: PdfService) {}

  @Post()
  // @UseInterceptors(FileInterceptor('file'), ClassSerializerInterceptor)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'bgImage', maxCount: 1 },
      { name: 'welcomeScreen', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  async create(
    @GetUser() user: User,
    // @UploadedFile() file: Express.Multer.File,
    @UploadedFiles()
    files: {
      pdfFile?: Express.Multer.File;
      welcomeScreen?: Express.Multer.File;
    },
    @Body() payload: CreatePdfDto,
  ): Promise<PdfResponseDto> {
    console.log(files, 'FILE_HERE');

    // Pass the buffer and other payload data to the service method
    const result: PdfResponseDto = await this.pdfService.createPdf(
      {
        ...payload,
        pdfFile: files?.pdfFile[0],
        welcomeScreen: files?.welcomeScreen[0],
      },
      user.id,
    );

    return result;
  }
}
