import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PdfService } from './pdf.service';
import { CreatePdfDto } from './dto/CreatePdfDto.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user-decoratore';
import { User } from '../users/entity/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PdfResponseDto } from './dto/PdfResponse.dto';

@ApiTags('Pdfs')
@Controller('pdf')
@UseGuards(AuthGuard())
export class PdfController {
  constructor(private pdfService: PdfService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'), ClassSerializerInterceptor)
  @ApiConsumes('multipart/form-data')
  async create(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: CreatePdfDto,
  ): Promise<PdfResponseDto> {
    console.log(payload, 'payload');
    console.log(file, 'FILE_HERE');

    // Pass the buffer and other payload data to the service method
    const result: PdfResponseDto = await this.pdfService.createPdf(
      { ...payload, pdfFile: file.buffer },
      user.id,
    );

    return result;
  }
}
