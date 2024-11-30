import { Injectable } from '@nestjs/common';
import { UploadFileDto } from './dto/fileUpload.dto';
import { uploadPdf } from 'src/helpers/contentful';

@Injectable()
export class FileUploadService {
  constructor() {}

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<{ fileUrl: string; assetId: string }> {
    const fileUrl = await uploadPdf(
      file.buffer,
      file.originalname,
      file.mimetype, // Should be 'application/pdf' for PDFs
    );
    return fileUrl;
  }
}
