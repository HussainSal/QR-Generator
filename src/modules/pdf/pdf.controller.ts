import { Controller, UseGuards } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { CreatePdfDto } from './dto/CreatePdfDto.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user-decoratore';
import { User } from '../users/entity/user.entity';

@UseGuards(AuthGuard())
@Controller('pdf')
export class PdfController {
    constructor(
        private pdfService:PdfService
    ){}

    
    async create (@GetUser() user:User , payload:CreatePdfDto){
        console.log(payload)
        this.pdfService.createPdf(payload,user.id)
    }

}
