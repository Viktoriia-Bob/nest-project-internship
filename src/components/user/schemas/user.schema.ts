import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Room } from 'src/components/room/schemas/room.schema';
import { statusEnum } from '../enums/status.enum';

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, default: null, ref: 'Room' })
  roomId: Room;

  @Prop({ default: 'https://picsum.photos/200/300' })
  avatar: string;

  @Prop()
  accessToken: string;

  @Prop()
  refreshToken: string;

  @Prop({ enum: Object.values(statusEnum), default: statusEnum.pending })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 }, { unique: true });
