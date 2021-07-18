import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './components/user/user.module';
import { RoomModule } from './components/room/room.module';
import { MessageModule } from './components/message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    UserModule,
    RoomModule,
    MessageModule,
  ],
})
export class AppModule {}
