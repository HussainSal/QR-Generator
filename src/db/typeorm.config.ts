import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Pdf } from 'src/modules/qrcodetype/entity/pdf.entity';
import { QrCode } from 'src/modules/qrcodetype/entity/qrcode.entity';
import { VCard } from 'src/modules/qrcodetype/entity/vcard.entitiy';
import { Website } from 'src/modules/qrcodetype/entity/website.entity';
import { Subscription } from 'src/modules/users/entity/subscription.entity';
import { User } from 'src/modules/users/entity/user.entity';

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
    console.log(
      configureService.get<string>('DATABASE_PASSWORD'),
      'MODULEEEEE',
      configureService.get<string>('DATABASE_NAME'),
    );

    return {
      type: 'postgres',
      host: configureService.get<string>('DATABASE_HOST'),
      port: configureService.get<number>('DATABASE_PORT'),
      username: configureService.get<string>('DATABASE_USER'),
      password: configureService.get<string>('DATABASE_PASSWORD'),
      database: configureService.get<string>('DATABASE_NAME'),
      entities: [User, Subscription, QrCode, Pdf, VCard, Website],
      autoLoadEntities: true,
      synchronize: true,
    };
  },
};
