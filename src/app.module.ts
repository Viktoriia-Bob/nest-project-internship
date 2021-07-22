import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './components/user/user.module';
import { RoomModule } from './components/room/room.module';
import { MessageModule } from './components/message/message.module';
import { AuthModule } from './components/auth/auth.module';
import { TokenModule } from './components/token/token.module';
import { MailModule } from './components/mail/mail.module';
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
