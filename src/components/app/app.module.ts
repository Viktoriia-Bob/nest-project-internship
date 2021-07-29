import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { RedisModule } from 'nestjs-redis';
import UserModule from '../user/user.module';
import RoomModule from '../room/room.module';
import MessageModule from '../message/message.module';
import AuthModule from '../auth/auth.module';
import MailModule from '../mail/mail.module';
import AppController from './app.controller';
import RolesGuard from '../auth/guards/role-auth.guard';
import ChatModule from '../chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    UserModule,
    RoomModule,
    MessageModule,
    AuthModule,
    MailModule,
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        url: configService.get<string>('REDIS_URL'),
        reconnectOnError: (): boolean => true,
      }),
      inject: [ConfigService],
    }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}
