import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Room } from 'src/components/room/schemas/room.schema';
import { User } from 'src/components/user/schemas/user.schema';

@Schema({
  versionKey: false,
  timestamps: true,
  collection: 'messages',
})
export class Message {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  ownerId: User;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Room' })
  roomId: Room;

  @Prop({ required: true })
  text: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
