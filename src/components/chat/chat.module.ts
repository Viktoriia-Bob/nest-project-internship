import { Module } from '@nestjs/common';
import MessageModule from '../message/message.module';
import RoomModule from '../room/room.module';
import UserModule from '../user/user.module';
import ChatGateway from './sockets/chat.gateway';

@Module({
  imports: [MessageModule, UserModule, RoomModule],
  providers: [ChatGateway],
})
export default class ChatModule {}
