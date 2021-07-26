import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Room } from 'src/components/room/schemas/room.schema';
import { rolesEnum } from '../enums/roles.enum';
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

  @Prop({ default: false })
  emailVerify: boolean;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, default: null, ref: 'Room' })
  roomId: Room;

  @Prop({ default: 'https://picsum.photos/200/300' })
  avatar: string;

  @Prop({ enum: Object.values(statusEnum), default: statusEnum.pending })
  status: statusEnum;

  @Prop({ enum: Object.values(rolesEnum), default: rolesEnum.user })
  role: rolesEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 }, { unique: true });
