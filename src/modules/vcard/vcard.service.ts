import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { VCard } from './entity/vcard.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVcardDto, UpdateVcardDto } from './dto/createVcardDto.dto';
import { User } from '../users/entity/user.entity';

@Injectable()
export class VcardService {
  constructor(
    @InjectRepository(VCard)
    private vcardRepository: Repository<VCard>,
  ) {}

  async create(payload: CreateVcardDto, user: string): Promise<VCard> {
    // const user = this.findOne()
    const vcard = this.vcardRepository.create({
      ...payload,
      user: { id: user },
    });
    console.log(vcard, 'VCARD_HERE');
    const res = await vcard.save();

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
