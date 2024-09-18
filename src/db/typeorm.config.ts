import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

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
    return {
      type: 'postgres',
      host: configureService.get<string>('DATABASE_HOST'),
      port: configureService.get<number>('DATABASE_PORT'),
      username: configureService.get<string>('postgres'),
      password: configureService.get<string>('DATABASE_PASSWORD'),
      database: configureService.get<string>('DATABASE_NAME'),
      autoLoadEntities: true,
      synchronize: true,
    };
  },
};
