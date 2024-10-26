import { Controller, Post } from '@nestjs/common';
import { QrcodetypeService } from './qrcodetype.service';

@Controller('qrcodetype')
export class QrcodetypeController {
    constructor(private qrcodeService:QrcodetypeService){}

    @Post('/')
    async createQr (){

        console.log("EXECUTED")
        const res = this.qrcodeService.createQr()
        return res
    }

}
