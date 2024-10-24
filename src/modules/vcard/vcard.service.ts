import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { VCard } from './entity/vcard.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVcardDto } from './dto/createVcardDto.dto';
import { User } from '../users/entity/user.entity';

@Injectable()
export class VcardService {
    constructor(
        @InjectRepository(VCard)
        private vcardRepository:Repository<VCard>,
    ){}

    async create (payload:CreateVcardDto,user:string):Promise<VCard>{
        // const user = this.findOne()
       const vcard = this.vcardRepository.create({...payload,user:{id:user}})
       console.log(vcard,"VCARD_HERE")
       const res = await vcard.save()

       return res
    } 

    async findAll (userId:string){
        const vcards = await this.vcardRepository.find({where:{user:{id:userId}}})
        return vcards
    } 

    
    async findOne (userId:string, vcardId:string){
        const vcard = await this.vcardRepository.find({where:{user:{id:userId}, id:vcardId}})
        return vcard
    } 

    async delete (vcardId:string){
        await this.vcardRepository.delete(vcardId);
    }

}
