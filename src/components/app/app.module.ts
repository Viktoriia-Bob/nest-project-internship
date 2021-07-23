import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '../user/user.module';
import { RoomModule } from '../room/room.module';
import { MessageModule } from '../message/message.module';
import AuthModule from '../auth/auth.module';
import { TokenModule } from '../token/token.module';
import { MailModule } from '../mail/mail.module';
import { AppController } from './app.controller';

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
    TokenModule,
    MailModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
