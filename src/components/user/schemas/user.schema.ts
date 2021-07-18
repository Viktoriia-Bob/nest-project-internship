import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Room } from 'src/components/room/schemas/room.schema';

@Schema({
  versionKey: false,
  timestamps: true,
  collection: 'users',
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId, default: null, ref: 'Room' })
  roomId: Room;

  @Prop({ default: 'https://picsum.photos/200/300' })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 }, { unique: true });
