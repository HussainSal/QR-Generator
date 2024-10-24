import { forwardRef, Module } from '@nestjs/common';
import { VcardController } from './vcard.controller';
import { VcardService } from './vcard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VCard } from './entity/vcard.entitiy';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([VCard]),forwardRef(() => AuthModule)],
  controllers: [VcardController],
  providers: [VcardService]
})
export class VcardModule {}
