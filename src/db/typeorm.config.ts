import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { PdfEntity } from 'src/modules/pdf/entity/Pdf.entity';
import { QrCode } from 'src/modules/qrcodetype/entity/qrcode.entity';
import { Subscription } from 'src/modules/users/entity/subscription.entity';
import { User } from 'src/modules/users/entity/user.entity';
import { VCard } from 'src/modules/vcard/entity/vcard.entitiy';
import { WebsiteEntity } from 'src/modules/website/entitiy/Website.entity';

// DATABASE_TYPE=postgres
// DATABASE_NAME=chat-app
// DATABASE_USER=postgres
// DATABASE_HOST=localhost
// DATABASE_PORT=5433
// DATABASE_PASSWORD=8520

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configureService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    // console.log(
    //   configureService.get<string>('DATABASE_PASSWORD'),
    //   'MODULEEEEE',
    //   configureService.get<string>('DATABASE_NAME'),
    // );

    return {
      type: 'postgres',
      host: configureService.get<string>('DATABASE_HOST'),
      port: configureService.get<number>('DATABASE_PORT'),
      username: configureService.get<string>('DATABASE_USER'),
      password: configureService.get<string>('DATABASE_PASSWORD'),
      database: configureService.get<string>('DATABASE_NAME'),
      entities: [User, Subscription, QrCode, PdfEntity, VCard, WebsiteEntity],
      autoLoadEntities: true,
      synchronize: true,
    };
  },
};
