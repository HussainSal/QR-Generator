import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './db/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { QrcodetypeModule } from './modules/qrcodetype/qrcodetype.module';
import { VcardModule } from './modules/vcard/vcard.module';


  
@Module({
  imports: [AuthModule, UsersModule, 
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    QrcodetypeModule,
    VcardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
