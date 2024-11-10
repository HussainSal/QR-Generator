import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { CreatePdfDto } from './dto/CreatePdfDto.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user-decoratore';
import { User } from '../users/entity/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

@UseGuards(AuthGuard())
@Controller('pdf')
export class PdfController {
    constructor(
        private pdfService: PdfService
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    async create(
        @GetUser() user: User,
        @UploadedFile() file: Express.Multer.File,
        @Body() payload: CreatePdfDto
    ) {
        console.log(payload, "payload");
        console.log(file, "FILE_HERE");

        // Pass the buffer and other payload data to the service method
        await this.pdfService.createPdf({ ...payload, pdfFile: file.buffer }, user.id);
    }
}
