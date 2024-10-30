import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { VCard } from './entity/vcard.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVcardDto, UpdateVcardDto } from './dto/createVcardDto.dto';
import { User } from '../users/entity/user.entity';
import { QrcodetypeService } from '../qrcodetype/qrcodetype.service';
import { CreateQrDto } from '../qrcodetype/dto/CreateQr.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VcardService {
  private configService: InstanceType<typeof ConfigService>;

  constructor(
    @InjectRepository(VCard)
    private vcardRepository: Repository<VCard>,
    private qrService: QrcodetypeService, // Inject QrcodetypeService here
  ) {
    this.configService = new ConfigService();
  }

  async create(payload: CreateVcardDto, user: string): Promise<VCard> {
    // const user = this.findOne()
    const vcard = this.vcardRepository.create({
      ...payload,
      user: { id: user },
    });
    console.log(vcard, 'VCARD_HERE');
    const res = await vcard.save();
    
    const qrPayload :CreateQrDto = {
      name:vcard.firstName,
      link:`${this.configService.get('NEXT_URL')}/${user}/${vcard.id}`,
      userId:user
    }

    const qrCode = await this.qrService.createQr(qrPayload)



    return res;
  }

  async update(payload: UpdateVcardDto, user: string): Promise<VCard> {
    // const user = this.findOne()

    const vcard = await this.vcardRepository.update(payload.id,{
      ...payload,
      user: { id: user },
    });

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
        const vcard = await this.vcardRepository.findOne({
          where: { id: vcardId },
        });
  
        if (vcard.user.id === userId) {
            const vcard = await this.vcardRepository.find({
                where: { user: { id: userId }, id: vcardId },
              });

            return vcard;
        }
      } catch (err) {
        console.log(err)
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
