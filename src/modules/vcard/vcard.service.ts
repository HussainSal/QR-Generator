import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { VCard } from './entity/vcard.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVcardDto, UpdateVcardDto } from './dto/createVcardDto.dto';
import { User } from '../users/entity/user.entity';
import { QrcodetypeService } from '../qrcodetype/qrcodetype.service';
import { CreateQrDto } from '../qrcodetype/dto/CreateQr.dto';
import { ConfigService } from '@nestjs/config';
import { QrCode } from '../qrcodetype/entity/qrcode.entity';
import { uploadPdf } from 'src/helpers/contentful';
import { FileUploadService } from '../file-upload/file-upload.service';

@Injectable()
export class VcardService {
  private configService: InstanceType<typeof ConfigService>;

  constructor(
    @InjectRepository(VCard)
    private vcardRepository: Repository<VCard>,
    private qrService: QrcodetypeService, // Inject QrcodetypeService here
    private fileupload: FileUploadService,
  ) {
    this.configService = new ConfigService();
  }

  async create(
    payload: CreateVcardDto,
    user: string,
  ): Promise<{ vcard: VCard; qrCode: QrCode }> {
    // vcard payload

    const image = await this.fileupload.uploadFile(payload.image);

    const vardPayload = {
      ...payload,
      image: image.fileUrl,
      imageId: image.assetId,
      user: { id: user },
      createAt: new Date().toISOString(),
    };

    const vcard = this.vcardRepository.create(vardPayload);
    const res = await vcard.save();

    const qrPayload: CreateQrDto = {
      name: vcard.firstName,
      link: `${this.configService.get('NEXT_URL')}/vcard/${vcard.id}`,
      userId: user,
      serviceId: vcard.id,
    };

    const qrCode = await this.qrService.createQr(qrPayload);
    console.log(qrCode, 'QRCODEEEEE');
    return { vcard: res, qrCode: qrCode };
  }

  async update(payload: UpdateVcardDto, user: string): Promise<VCard> {
    const image = await this.fileupload.uploadFile(payload.image);

    const vardPayload = {
      ...payload,
      image: image.fileUrl,
      user: { id: user },
      createAt: new Date().toISOString(),
    };

    const vcard = await this.vcardRepository.update(payload.id, vardPayload);

    const updatedVCard = await this.vcardRepository.findOne({
      where: { id: payload.id },
    });

    return updatedVCard;
  }

  async findAll(userId: string) {
    const vcards = await this.vcardRepository.find({
      where: { user: { id: userId } },
    });
    return vcards;
  }

  async findOne(userId: string, vcardId: string) {
    try {
      let vcard = await this.vcardRepository.findOne({
        where: { id: vcardId },
      });

      console.log(vcard, 'vcardvcard', userId);

      if (vcard.user.id === userId) {
        const vcardArray = await this.vcardRepository.find({
          where: { user: { id: userId }, id: vcardId },
        });

        const vcard = vcardArray[0]; // Get the first element from the array

        return vcard;
      }
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('No such vcard found');
    }
  }

  async delete(vcardId: string, userId: string) {
    try {
      const vcard = await this.vcardRepository.findOne({
        where: { id: vcardId },
      });

      if (vcard.user.id === userId) {
        await this.vcardRepository.delete(vcardId);
      }
    } catch (err) {
      throw new UnauthorizedException('No such vcard found');
    }
  }
}
